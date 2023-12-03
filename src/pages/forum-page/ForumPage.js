import { Select } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getItem } from '../../utils';
import './style.scss';
import {
  getTopicsAll,
  getTopicsApproved,
  getTopicsUnapproved,
  getTopicsSelf,
  getTopicsBookmarked,
  getUser,
  getAllReply,
  getAllUser,
} from '../../service/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faComment,
  faEnvelope,
  faHouseChimney,
  faList,
  faListCheck,
  faPhone,
  faPlus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import TopicPost from '../../component/forum/topic-post/TopicPost';
import TopicView from '../../component/forum/topic-view/TopicView';
import { UserAvatar } from '../../component/avatar/UserAvatar';
import { topicCategory } from '../../enum';
import { forum_posts } from './ForumDB';
import Paginator from '../../component/paginator/Paginator';
import PostCount from '../../component/post-count/PostCount';
const viewModes = [
  {
    value: 0,
    label: 'All',
    admin: true,
    icon: faList,
  },
  {
    value: 1, // approved
    label: 'Home',
    admin: false,
    icon: faHouseChimney,
  },
  {
    value: 2,
    label: 'Queue',
    admin: true,
    icon: faListCheck,
  },
  {
    value: 3,
    label: 'My topics',
    admin: false,
    icon: faComment,
  },
  {
    value: 4,
    label: 'Bookmarked',
    admin: false,
    icon: faBookmark,
  },
];
export default function ForumPage() {
  const currentUser = getItem('user');

  const isAdmin = currentUser?.role === 1;
  const postFreely = isAdmin || currentUser?.role === 2;
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [show, setShow] = useState(false);
  const [topic, setTopic] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [viewMode, setViewMode] = useState(isAdmin ? 0 : 1);
  const [updateList, setUpdateList] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [filteringCategory, setFilteringCategory] = useState(-1);
  const [editContent, setEditContent] = useState(null);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxCount, setMaxCount] = useState(3);
  // 0 view all
  // 1 view approved
  // 2 view not approved
  // 3 view self
  // 4 view bookmarked
  const changeList = () => {
    setUpdateList(!updateList);
  };
  const changeComment = () => {
    setUpdateComment(!updateComment);
  };
  const [filteredPost, setFilteredPost] = useState([]);
  useEffect(() => {
    getAllUser().then((res) => {
      setUsers(res.data.users);
    });
  }, []);
  useEffect(() => {
    getAllReply().then((res) => {
      setComments(res.data.replies);
    });
  }, [updateComment]);
  useEffect(() => {
    setIsloading(true);
    setTopic([]);
    setSearchText('');

    switch (viewMode) {
      case 0:
        getTopicsAll()
          .then((res) => {
            setTopic(res.data);
          })
          .finally(() => {
            setIsloading(false);
          });
        break;
      case 1:
        getTopicsApproved()
          .then((res) => {
            setTopic(res.data);
          })
          .finally(() => {
            setIsloading(false);
          });
        break;
      case 2:
        getTopicsUnapproved()
          .then((res) => {
            setTopic(res.data);
          })
          .finally(() => {
            setIsloading(false);
          });
        break;
      case 3:
        getTopicsSelf(currentUser?.id)
          .then((res) => {
            setTopic(res.data);
          })
          .finally(() => {
            setIsloading(false);
          });
        break;
      case 4:
        getTopicsBookmarked(currentUser?.id)
          .then((res) => {
            setTopic(res.data);
          })
          .finally(() => {
            setIsloading(false);
          });
        break;
      default:
        break;
    }
    getTopicsBookmarked(currentUser?.id).then((res) => {
      setBookmarkList(res.data.map((item) => item.id));
    });
  }, [viewMode, updateList]);

  useEffect(() => {
    const newForum = topic.filter(
      (user) =>
        user.title.toLowerCase().includes(searchText.toLowerCase()) &&
        (user.cate_id === filteringCategory || filteringCategory === -1),
    );
    setCurrentPage(0);
    setFilteredPost(newForum);
  }, [searchText, topic, filteringCategory]);

  return (
    <React.Fragment>
      <div className="forum-container">
        <div className="forum-sidebar-left">
          <div className="forum-sidebar-item search">
            <FontAwesomeIcon icon={faSearch} />
            <input
              className="post-search"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          {viewModes.map(
            (item) =>
              ((item.admin && isAdmin) || !item.admin) && (
                <div
                  className={`forum-sidebar-item ${
                    item.value === viewMode ? 'active' : ''
                  }}`}
                  onClick={() => setViewMode(item.value)}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  {item.label}
                </div>
              ),
          )}
        </div>
        <div className="forum-body">
          <div className="post-create" onClick={() => setShow(true)}>
            <input className="post-create-input" placeholder="Title" disabled />
            <div className="post-button">
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div class="forum-tool">
            <PostCount count={maxCount} setCount={setMaxCount} />
            <select
              className="main-input"
              style={{
                width: '20%',
                alignSelf: 'flex-end',
              }}
              onChange={(e) => {
                setFilteringCategory(+e.target.value);
              }}
              value={filteringCategory}
            >
              {[
                {
                  id: -1,
                  name: 'All',
                  color: '#000000',
                  descriptiion: 'All topic',
                },
                ...topicCategory,
              ].map((item, index) => (
                <option
                  style={{
                    color: item.color,
                    width: '50%',
                    borderRadius: 20,
                  }}
                  value={item.id}
                  key={index}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {isLoading ? (
            <div>Loading</div>
          ) : filteredPost.length > 0 ? (
            <React.Fragment>
              {filteredPost
                .filter((_, index) => {
                  return (
                    index >= currentPage * maxCount &&
                    index < (currentPage + 1) * maxCount
                  );
                })
                .map((post, index) => (
                  <React.Fragment key={index}>
                    <TopicView
                      post={post}
                      user={users}
                      comment={comments}
                      showApproval={
                        (viewMode === 0 || viewMode === 2) && isAdmin
                      }
                      isAdmin={isAdmin}
                      changeList={changeList}
                      changeComment={changeComment}
                      setEditContent={setEditContent}
                      bookmarkList={bookmarkList}
                    />
                  </React.Fragment>
                ))}
              {filteredPost.length / maxCount > 1 && (
                <Paginator
                  length={filteredPost.length / maxCount}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </React.Fragment>
          ) : (
            <div>No content</div>
          )}
        </div>
        <div className="forum-sidebar-right">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div className="forum-sidebar-item" key={index}>
                <UserAvatar
                  src={user?.id}
                  className="forum-sidebar-item-avatar"
                />
                <div className="forum-sidebar-item-name">{user?.name}</div>
                <div className="user-info-card">
                  <div className="card-ava-name">
                    <UserAvatar src={user?.id} className="card-avatar" />
                    {user?.name}
                  </div>
                  <div className="field-info">
                    <span>
                      <FontAwesomeIcon icon={faEnvelope} /> Email: {user?.email}
                    </span>
                  </div>
                  {user?.phone_number && (
                    <div className="field-info">
                      <span>
                        <FontAwesomeIcon icon={faPhone} />
                        Phone: {user?.phone_number}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="forum-sidebar-item">No user</div>
          )}
        </div>
      </div>
      {/*  {(show || editContent !== null) && ( */}
      <TopicPost
        show={show || editContent !== null}
        setShow={setShow}
        changeList={changeList}
        postFreely={postFreely}
        setEditContent={setEditContent}
        editContent={editContent}
      />
      {/*  )} */}
    </React.Fragment>
  );
}
