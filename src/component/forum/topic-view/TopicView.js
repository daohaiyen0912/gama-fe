import React, { useState } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faCircleCheck,
  faCircleXmark,
  faPaperPlane,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { UserAvatar } from '../../avatar/UserAvatar';
import { getItem } from '../../../utils';
import {
  approveTopic,
  bookmarkTopic,
  deleteBookmark,
  deleteReply,
  deleteTopic,
  disapproveTopic,
  replyTopic,
} from '../../../service/api';
import addNotification, { NOTIFICATION_TYPE } from '../../notification';

export default function TopicView({
  post,
  user,
  comment,
  showApproval,
  changeList,
  changeComment,
  isAdmin,
  setEditContent,
  bookmarkList,
}) {
  const topicUser = user.find((u) => u.id === post.created_by);
  const [commentContent, setCommentContent] = useState('');
  const currentUser = getItem('user');
  const approveTopicHandle = (id) => {
    approveTopic(id)
      .then((res) => {
        addNotification('Topic approved', NOTIFICATION_TYPE.SUCCESS);
      })
      .catch((err) => {
        addNotification('Something went wrong', NOTIFICATION_TYPE.ERROR);
      })
      .finally(() => {
        changeList();
      });
  };
  const disapproveTopicHandle = (id) => {
    disapproveTopic(id)
      .then((res) => {
        addNotification('Topic disapproved', NOTIFICATION_TYPE.SUCCESS);
      })
      .catch((err) => {
        addNotification('Something went wrong', NOTIFICATION_TYPE.ERROR);
      })
      .finally(() => {
        changeList();
      });
  };
  const bookmarkTopicHandle = (id, userId) => {
    bookmarkTopic(id, userId)
      .then((res) => {
        addNotification('Topic bookmarked', NOTIFICATION_TYPE.SUCCESS);
      })
      .catch((err) => {
        addNotification('Something went wrong', NOTIFICATION_TYPE.ERROR);
      })
      .finally(() => {
        changeList();
      });
  };
  const deleteBookmarkHandle = (id, userId) => {
    deleteBookmark(id, userId)
      .then((res) => {
        addNotification('Bookmark deleted', NOTIFICATION_TYPE.SUCCESS);
      })
      .catch((err) => {
        addNotification('Something went wrong', NOTIFICATION_TYPE.ERROR);
      })
      .finally(() => {
        changeList();
      });
  };
  const deleteReplyHandle = (id) => {
    deleteReply(id)
      .then((res) => {
        addNotification('Reply deleted', NOTIFICATION_TYPE.SUCCESS);
      })
      .catch((err) => {
        addNotification('Something went wrong', NOTIFICATION_TYPE.ERROR);
      })
      .finally(() => {
        changeComment();
      });
  };
  const deleteTopicHandle = (id) => {
    deleteTopic(id)
      .then((res) => {
        addNotification('Topic deleted', NOTIFICATION_TYPE.SUCCESS);
      })
      .catch((err) => {
        addNotification('Something went wrong', NOTIFICATION_TYPE.ERROR);
      })
      .finally(() => {
        changeList();
      });
  };
  const replyTopicHandle = (id) => {
    replyTopic({
      topic_id: id,
      content: commentContent,
      created_by: currentUser.id,
    }).finally(() => {
      setCommentContent('');
      changeComment();
    });
  };
  return (
    <div className="post-item">
      <div className="approve-button">
        {showApproval && (
          <>
            <div
              className={`clickable-icon ${post.status === 1 && 'approved'}`}
              onClick={() => approveTopicHandle(post.id)}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <div
              className={`clickable-icon ${post.status === 2 && 'disapproved'}`}
              onClick={() => disapproveTopicHandle(post.id)}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </div>
          </>
        )}
        <div
          className={`clickable-icon ${
            bookmarkList.includes(post.id) && 'bookmarked'
          }`}
          onClick={() => {
            if (bookmarkList.includes(post.id)) {
              deleteBookmarkHandle(post.id, currentUser.id);
            } else {
              bookmarkTopicHandle(post.id, currentUser.id);
            }
          }}
        >
          <FontAwesomeIcon icon={faBookmark} />
        </div>
        {(isAdmin || post.created_by === currentUser?.id) && (
          <React.Fragment>
            <div
              className="clickable-icon"
              onClick={() => deleteTopicHandle(post.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <div
              className="clickable-icon"
              onClick={() => {
                setEditContent(post);
              }}
            >
              <FontAwesomeIcon icon={faPencil} />
            </div>
          </React.Fragment>
        )}
      </div>

      <div className="post-item-header">{post.title}</div>
      <div className="post-item-subheader">
        <UserAvatar className="post-item-avatar" src={topicUser?.id} />
        <div className="post-item-name">
          {topicUser?.name ?? 'Anonymous User'}
        </div>
      </div>
      <div
        className="post-item-body"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />

      <div className="post-item-interact">
        <div class="interact-comment">
          <input
            placeholder="Comments"
            value={commentContent}
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                replyTopicHandle(post.id);
              }
            }}
          />
          <div
            className="commentSend"
            onClick={() => replyTopicHandle(post.id)}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
        </div>
      </div>

      <div className="post-item-footer">
        {comment
          .filter((c) => c.topic_id === post.id)
          .map((c, index) => (
            <div className="comment-item" key={index}>
              <UserAvatar
                className="comment-avatar"
                src={user?.find((user) => user.id === c.created_by)?.id}
              />
              <div className="comment-content">{c.content}</div>
              {(showApproval || c.created_by === currentUser?.id) && (
                <React.Fragment>
                  <div
                    className="delete-comment"
                    onClick={() => deleteReplyHandle(c.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </React.Fragment>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
