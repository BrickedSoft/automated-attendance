'use client'

import * as canvas from 'canvas'
import * as faceApi from 'face-api.js'
import { useEffect, useRef } from 'react'

import File from './File'

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

const Frame = () => {
  const frameRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (frameRef.current) initWebCam(frameRef.current)
  }, [frameRef])

  useEffect(() => {
    frameRef?.current?.addEventListener('play', async () => {
      console.log('play')
      const present = new Set<string>([])
      if (frameRef.current) {
        const labeledFaceDescriptors = await getLabeledFaceDescriptions()
        const faceMatcher = new faceApi.FaceMatcher(labeledFaceDescriptors)

        const canvas = faceApi.createCanvasFromMedia(frameRef.current)
        document.body.append(canvas)

        const displaySize = {
          width: frameRef.current.width,
          height: frameRef.current.height
        }
        faceApi.matchDimensions(canvas, displaySize)

        setInterval(async () => {
          if (frameRef.current) {
            const detections = await faceApi
              .detectAllFaces(frameRef.current)
              .withFaceLandmarks()
              .withFaceDescriptors()

            const resizedDetections = faceApi.resizeResults(detections, displaySize)

            canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)

            const results = resizedDetections.map((d) => {
              return faceMatcher.findBestMatch(d.descriptor).toString()
            })
            results.forEach((result, i) => {
              const box = resizedDetections[i].detection.box
              const drawBox = new faceApi.draw.DrawBox(box, {
                label: result
              })

              present.add(result)

              console.log(present)

              drawBox.draw(canvas)
            })
          }
        }, 100)
      }
    })
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <video
        ref={frameRef}
        id="video"
        width="600"
        height="450"
        autoPlay
        className="border-2"
      ></video>

      <File />
    </main>
  )
}

export default Frame
