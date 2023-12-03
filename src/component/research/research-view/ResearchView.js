import React from 'react';
import './style.scss';
import { getItem } from '../../../utils';
import { deleteResearch } from '../../../service/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { researchCategory } from '../../../enum';
import { useSimulationContext } from '../../simulation-context/SimulationContext';
import { useHistory } from 'react-router-dom';

// preview mode
// 0 in research page
// 1 in news
// 2 in research
const ResearchView = ({
  research,
  changeList,
  setEditContent,
  setShowPostModal,
  users,
  previewMode,
}) => {
  const currentUser = getItem('user');
  const isAdmin = currentUser?.role === 1;
  const researchListMode = previewMode === 0;
  const landingPageMode = previewMode === 1;
  const normalMode = previewMode === 2;
  const { setSelectedResearch } = useSimulationContext();
  const history = useHistory();
  return landingPageMode ? (
    <div
      className="research-item-landing-page"
      onClick={() => {
        setSelectedResearch(research);
        history.push('/research');
        document.documentElement.scrollTop = 0;
      }}
    >
      <div
        className="div-image"
        style={{
          background: `url('./image/research/${
            researchCategory.find((item) => item.id === research.cate_id)
              .description
          }_banner.jpg') center / cover no-repeat`,
        }}
      />
      <div className="research-title">{research.name}</div>
    </div>
  ) : (
    <div
      className={`research-item ${researchListMode ? 'preview-mode' : ''} }`}
    >
      {normalMode ? (
        <div
          className="div-image"
          style={{
            background: `url('./../image/research/${
              researchCategory.find((item) => item.id === research.cate_id)
                .description
            }_banner.jpg') center / cover no-repeat`,
          }}
        >
          <h2>{research.name}</h2>
        </div>
      ) : (
        <h2 className="title">{research.name}</h2>
      )}
      <div class="research-body-content">
        <div className="approve-button">
          {(isAdmin || research.created_by === currentUser?.id) &&
            !researchListMode && (
              <React.Fragment>
                <div
                  className="clickable-icon"
                  onClick={() => {
                    deleteResearch(research.id).finally(() => {
                      changeList();
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
                <div
                  className="clickable-icon"
                  onClick={() => {
                    setEditContent(research);
                    setShowPostModal(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </div>
              </React.Fragment>
            )}
        </div>
        <div className="category">
          <span>Category: </span>
          <span
            style={{
              color: researchCategory.find(
                (category) => category.id === research.cate_id,
              )?.color,
            }}
          >
            {
              researchCategory.find(
                (category) => category.id === research.cate_id,
              )?.name
            }
          </span>
        </div>
        <div
          className="research-content"
          dangerouslySetInnerHTML={{ __html: research.content }}
        ></div>
        <div className="author">
          <span>Author: </span>
          <span>
            {users?.find((user) => user.id === research.created_by)?.name}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ResearchView;
