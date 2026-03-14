import ThreadItem from './ThreadItem'

function ThreadList ({ threads }) {
  return (
    <div className="threads-list">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </div>
  )
}

export default ThreadList
