import { useEffect, useState, useRef } from 'react'

import { constraints } from '../../data/constraints'
import { BsRecordFill } from 'react-icons/bs'
import './video-card.css'

const VideCard = () => {
  const videoRef = useRef(null)
  const [msgError, setMsgError] = useState('')

  const handleSuccess = (stream) => {
    const video = videoRef.current
    const videoTracks = stream.getVideoTracks()
    window.stream = stream
    video.srcObject = stream

    getSupportedMimeTypes().forEach((mimeType) => {
      console.log(mimeType)
    })

    console.log('Using video device: ' + videoTracks[0].label)
  }

  const handleError = (error) => {
    if (error.name === 'ConstraintNotSatisfiedError') {
      const v = constraints.video
      setMsgError(
        `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
      )
    } else if (error.name === 'PermissionDeniedError') {
      setMsgError(
        'Permissions have not been granted to use your camera and ' +
          'microphone, you need to allow the page access to your devices in ' +
          'order for the demo to work.'
      )
    }
    console.log(`Error: ${error.name}`)
  }

  useEffect(() => {
    const initial = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        handleSuccess(stream)
      } catch (e) {
        handleError(e)
      }
    }

    initial()
  }, [])
  return (
    <div className='video-div'>
      <video autoPlay playsInline ref={videoRef} className='video' />

      <div className='controls-div'>
        <button>Grabar</button>
        <div className='status-recorder'>
          <BsRecordFill color='red' />
          <p>0:00/2:00</p>
        </div>
      </div>

      <div className='error-div'>
        <p>{msgError}</p>
      </div>
    </div>
  )
}

export default VideCard
