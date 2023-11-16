import AttendeeList from '@renderer/components/AttendeeList'
import VideoFrame from '@renderer/components/VideoFrame'

const Home = () => {
  return (
    <main className={`relative flex flex-col items-center justify-center bg-gray bg-black`}>
      <VideoFrame />
      <AttendeeList />
    </main>
  )
}

export default Home
