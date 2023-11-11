import { SyntheticEvent, useEffect, useRef } from 'react'
import * as faceApi from 'face-api.js'
import { Resizable } from 're-resizable'

const startWebCam = (ref: HTMLVideoElement) => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then((stream) => {
      ref.srcObject = stream
    })
    .catch((error) => {
      console.error(error)
    })
}

function getLabeledFaceDescriptions() {
  const labels = ['emon', 'post', 'mansib', 'yashrif']
  return Promise.all(
    labels.map(async (label) => {
      const descriptions: (Float32Array | undefined)[] = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceApi.fetchImage(`/labels/${label}/${i}.jpg`)
        const detections = await faceApi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor()
        descriptions.push(detections?.descriptor)
      }
      return new faceApi.LabeledFaceDescriptors(label, descriptions as Float32Array[])
    })
  )
}

const initWebCam = async (ref: HTMLVideoElement) => {
  await faceApi.nets.ssdMobilenetv1.loadFromUri('/models')
  await faceApi.nets.faceRecognitionNet.loadFromUri('/models')
  await faceApi.nets.faceLandmark68Net.loadFromUri('/models')
  startWebCam(ref)
}

const VideoFrame = () => {
  const frameContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<HTMLVideoElement>(null)
  const present = new Set<string>([])

  useEffect(() => {
    if (frameRef.current) initWebCam(frameRef.current)
  }, [frameRef])

  const onPlay = async (e: SyntheticEvent<HTMLVideoElement>) => {
    const videoFrame = e.target as HTMLVideoElement
    const canvas = canvasRef.current as HTMLCanvasElement
    const labeledFaceDescriptors = await getLabeledFaceDescriptions()
    const faceMatcher = new faceApi.FaceMatcher(labeledFaceDescriptors)

    const displaySize = { width: videoFrame.clientWidth, height: videoFrame.clientHeight }
    faceApi.matchDimensions(canvas, displaySize as faceApi.IDimensions)

    setInterval(async () => {
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

        present.add(result.toString())
        present.add(result.label)
        console.log(present)

        drawBox.draw(canvas)
      })
    }, 100)
  }
  return (
    <main
      ref={frameContainerRef}
      className="relative w-full h-[calc(100vh - container)] overflow-hidden"
    >
      <Resizable className="border-2 border-red-500">
        <video
          ref={frameRef}
          id="video"
          width={'100%'}
          height={'100%'}
          autoPlay
          onPlay={onPlay}
          className="h-full w-full border-green-500"
        ></video>
        <canvas ref={canvasRef} className='absolute top-0 left-0' />

      </Resizable>
    </main>
  )
}

export default VideoFrame
