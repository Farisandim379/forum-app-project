import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncReceiveDetailThread, asyncAddComment } from '../states/detailThread/action'
import ThreadDetail from '../components/ThreadDetail'
import CommentInput from '../components/CommentInput'
import CommentItem from '../components/CommentItem'

function DetailPage () {
  const { id } = useParams()
  const { detailThread = null, authUser } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id))
  }, [id, dispatch])

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }))
  }

  // Tampilkan loading jika data belum selesai di-fetch
  if (!detailThread) {
    return <p>Memuat detail diskusi...</p>
  }

  return (
    <section className="detail-page">
      <ThreadDetail {...detailThread} />

      <div className="detail-page__comments">
        <h3>Beri Komentar</h3>
        <CommentInput addComment={onAddComment} authUser={authUser} />

        <h3 style={{ marginTop: '30px' }}>Komentar ({detailThread.comments.length})</h3>
        <div className="comments-list">
          {detailThread.comments.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DetailPage
