import * as faceApi from 'face-api.js'
import _ from 'lodash'
import { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react'

import { MatcherContext, MatcherContextType } from '@renderer/context/MatcherContext'
import { UserContext } from '@renderer/context/UserContext'
import { UserContextType } from '@renderer/types/user'
import { data } from '@renderer/assets/data/videoFrame'

const VideoFrame = () => {
  const [localStream, setLocalStream] = useState<MediaStream | undefined>()
  const [isCameraOn, setIsCameraOn] = useState<boolean>()
  const { descriptors } = useContext(MatcherContext) as MatcherContextType
  const { users } = useContext(UserContext) as UserContextType
  const { setPresentUsers } = useContext(UserContext) as UserContextType
  const frameRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const matchingInterval = useRef<NodeJS.Timeout>()
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 })

  const startWebCam = async (ref: HTMLVideoElement) => {
    await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false
      })
      .then((stream) => {
        setLocalStream(stream)
        ref.srcObject = stream
        setIsCameraOn(true)
      })
      .catch((error) => {
        console.error(error)
        setIsCameraOn(false)
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
    if (!frameRef.current) return
    const resizeObserver = new ResizeObserver(() => {
      setFrameSize({
        width: frameRef.current?.clientWidth ?? 0,
        height: frameRef.current?.clientHeight ?? 0
      })
    })
    resizeObserver.observe(frameRef.current)
    return () => resizeObserver.disconnect()
  }, [])

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
          const user = users[result.label.toString()]
          const drawBox = new faceApi.draw.DrawBox(box, {
            label: result.distance < 0.4 ? user?.name : 'Unknown'
          })
          if (user && result.distance < 0.4) {
            setPresentUsers((state) => {
              if (_.has(state, user.id)) return state
              else {
                console.log('adding once', user.name)
                return { ...state, ..._.keyBy([user], 'id') }
              }
            })
          }

          drawBox.draw(canvas)
        })
      }, 100)
    }
  }, [descriptors, frameRef, canvasRef, users])

  return (
    <main className={`relative flex flex-col items-center justify-center bg-gray`}>
      <video
        ref={frameRef}
        id="video"
        autoPlay
        onPlay={onPlay}
        className="w-full max-h-full py-6 px-8"
      ></video>
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4"
        style={{
          width: `${frameSize.width}px`,
          height: `${frameSize.height}px`
        }}
      />

      {!isCameraOn && (
        <div className="absolute flex flex-col items-center gap-6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          <div className="flex items-center gap-4">
            <div
              className={`${
                isCameraOn === false ? 'text-light-red-3e' : 'text-light-blue-ff'
              } text-2xl`}
            >
              {isCameraOn === false ? data.camera.off.icon : data.camera.initializing.icon}
            </div>

            <p
              className={`${
                isCameraOn === false ? 'text-light-red-3e' : 'text-light-blue-ff'
              } text-2xl font-medium`}
            >
              {isCameraOn === false ? data.camera.off.title : data.camera.initializing.title}
            </p>
          </div>

          {isCameraOn === false && (
            <button
              className="text-white bg-light-red-3e hover:bg-light-red-31 focus:ring-4 focus:outline-none focus:ring-light-red-3e/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex gap-2 items-center dark:focus:ring-light-blue-ff/55 transition duration-300"
              onClick={() => {
                if (frameRef.current) startWebCam(frameRef.current)
                setIsCameraOn(undefined)
              }}
            >
              {data.button.error.title}
            </button>
          )}
        </div>
      )}
    </main>
  )
}

export default VideoFrame
