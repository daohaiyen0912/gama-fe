import React, { useEffect, useState } from 'react';
import './style.scss';
import { getAllUser, getResearchAll } from '../../service/api';
import ResearchPost from '../../component/research/research-post/ResearchPost';
import Paginator from '../../component/paginator/Paginator';
import { getItem } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { researchCategory } from '../../enum';
import ResearchView from '../../component/research/research-view/ResearchView';
import PostCount from '../../component/post-count/PostCount';
import { researchdb } from './mockrb';
import { useSimulationContext } from '../../component/simulation-context/SimulationContext';
export default function ResearchPage() {
  const [loading, setLoading] = React.useState(false);
  const [researchs, setResearchs] = React.useState([]);
  const [showPostmodal, setShowPostModal] = React.useState(false);
  const [refreshResearch, setRefreshResearch] = React.useState(false);
  const [editContent, setEditContent] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const currentUser = getItem('user');
  const [searchText, setSearchText] = useState('');
  const [filteringCategory, setFilteringCategory] = useState(-1);
  const [fileredResearchs, setFilteredResearchs] = useState([]);
  const isAdmin = currentUser?.role === 1;
  const postFreely = isAdmin || currentUser?.role === 2;
  const [maxCount, setMaxCount] = useState(3);
  const [users, setUsers] = useState([]);
  const { selectedResearch, setSelectedResearch } = useSimulationContext();
  useEffect(() => {
    getAllUser().then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  useEffect(() => {
    getResearchAll().then((res) => {
      setResearchs(res.data.researchs);
    });
  }, [refreshResearch]);
  useEffect(() => {
    setFilteredResearchs(
      researchs.filter((research) => {
        return (
          research.name.toLowerCase().includes(searchText.toLowerCase()) &&
          (filteringCategory === -1 || research.cate_id === filteringCategory)
        );
      }),
    );
    setCurrentPage(0);
    console.log({ searchText, filteringCategory });
  }, [searchText, filteringCategory, researchs]);
  const changeList = () => setRefreshResearch(!refreshResearch);
  useEffect(() => {
    if (selectedResearch && editContent) {
      setSelectedResearch(null);
    }
  }, [editContent]);
  return (
    <>
      <div className="research-page">
        <div className="page-navigator">
          <input
            className="main-input dimmed"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            className="main-input dimmed"
            onChange={(e) => setFilteringCategory(+e.target.value)}
          >
            <option value={-1}>All</option>
            {researchCategory.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
          <PostCount count={maxCount} setCount={setMaxCount} />
        </div>
        <div className="research-content">
          <div className="research-header">
            <h1>Research and Development</h1>
          </div>
          <div className="research-body">
            {postFreely && (
              <div className="publish-research">
                <button
                  className="main-button"
                  onClick={() => setShowPostModal(true)}
                >
                  Publish Research
                </button>
              </div>
            )}
            {fileredResearchs
              .filter(
                (_, index) =>
                  index >= currentPage * maxCount &&
                  index < (currentPage + 1) * maxCount,
              )
              .map((research, index) => (
                <div onClick={() => setSelectedResearch(research)}>
                  <ResearchView
                    research={research}
                    changeList={changeList}
                    setShowPostModal={setShowPostModal}
                    setEditContent={setEditContent}
                    users={users}
                    previewMode={0}
                  />
                </div>
              ))}
            {fileredResearchs?.length / maxCount > 1 && (
              <Paginator
                length={fileredResearchs?.length / maxCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
      {selectedResearch && (
        <div className="research-modal">
          <div
            className="research-modal-close"
            onClick={() => setSelectedResearch(null)}
          />
          <ResearchView
            research={selectedResearch}
            changeList={changeList}
            setShowPostModal={setShowPostModal}
            setEditContent={setEditContent}
            users={users}
            previewMode={2}
          />
        </div>
      )}
      {showPostmodal && (
        <ResearchPost
          show={showPostmodal}
          setShow={setShowPostModal}
          changeList={changeList}
          postFreely={true}
          editContent={editContent}
          setEditContent={setEditContent}
        />
      )}
    </>
  );
}
