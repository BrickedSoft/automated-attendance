import { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react'
import * as faceApi from 'face-api.js'

import { MatcherContext, MatcherContextType } from '@renderer/context/MatcherContext'

const VideoFrame = () => {
  const [localStream, setLocalStream] = useState<MediaStream | undefined>()
  const { descriptors } = useContext(MatcherContext) as MatcherContextType
  const frameRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const matchingInterval = useRef<NodeJS.Timeout>()
  const present = new Set<string>([])

  const startWebCam = async (ref: HTMLVideoElement) => {
    await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false
      })
      .then((stream) => {
        setLocalStream(stream)
        ref.srcObject = stream
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const stopWebCam = async (stream) => {
    await stream.getVideoTracks()[0].stop()
  }

  const onPlay = async (e: SyntheticEvent<HTMLVideoElement>) => {
    const videoFrame = e.target as HTMLVideoElement
    const displaySize = { width: videoFrame.clientWidth, height: videoFrame.clientHeight }
    if (canvasRef.current)
      faceApi.matchDimensions(canvasRef.current, displaySize as faceApi.IDimensions)
  }

  useEffect(() => {
    if (frameRef.current) startWebCam(frameRef.current)
    const cleanUp = () => {
      if (localStream) stopWebCam(localStream) //TODO: Doesn't work
      clearInterval(matchingInterval.current)
    }
    return () => cleanUp()
  }, [frameRef])

  useEffect(() => {
    if (descriptors && frameRef.current && canvasRef.current) {
      const videoFrame = frameRef.current
      const displaySize = { width: videoFrame.clientWidth, height: videoFrame.clientHeight }
      const faceMatcher = new faceApi.FaceMatcher(descriptors)
      const canvas = canvasRef.current
      clearInterval(matchingInterval.current)
      matchingInterval.current = setInterval(async () => {
        const detections = await faceApi

          .detectAllFaces(videoFrame as HTMLVideoElement)
          .withFaceLandmarks()
          .withFaceDescriptors()

        const resizedDetections = faceApi.resizeResults(
          detections,
          displaySize as faceApi.IDimensions
        )

        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor)
        })
        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box
          const drawBox = new faceApi.draw.DrawBox(box, { label: result.toString() })

          // present.add(result.toString())
          present.add(result.label)
          // console.log(present)

          drawBox.draw(canvas)
        })
      }, 100)
    }
  }, [descriptors, frameRef, canvasRef])

  return (
    <main className="relative h-screen flex items-center justify-center bg-gray">
      <video ref={frameRef} id="video" autoPlay onPlay={onPlay} className="h-full p-10"></video>
      <canvas ref={canvasRef} className="absolute top-0 left-0" />
    </main>
  )
}

export default VideoFrame
