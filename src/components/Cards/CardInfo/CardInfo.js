import React, { useState, useEffect } from "react";
import Modal from "../../Modal/Modal";
import Editable from "../../Editable/Editable";
import Chip from "../../Chip/Chip";

import "./CardInfo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faHeading,
  faList,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const colors = [
  { color: "#a8193d", text: "cypress" },
  { color: "#4fcc25", text: "backend" },
  { color: "#1ebffa", text: "frontend" },
  { color: "#9975bd", text: "pyhton" },
  { color: "#cf61a1", text: "in progress" },
  { color: "#240959", text: "blocked" },
];

const users = [
  {
    name: "Ahfarooqi",
    url: "https://trello-members.s3.amazonaws.com/5e37f0ee66a5166ba044f36f/b25b900e834dc2a8f1659049bd10b6c4/50.png",
  },
  {
    name: "Anas Usman",
    url: "https://trello-members.s3.amazonaws.com/5f191ef0fb7b6957d3e7c305/ba52956c6e33e4751ad28c690685affe/50.png",
  },
  {
    name: "Munnam Mubasshir",
    url: "https://trello-members.s3.amazonaws.com/5f154e7861c0e4674928206d/1fdd2acd70fe95401a2b811f4f128cd8/50.png",
  },
  {
    name: "Asad Ali",
    url: "https://trello-members.s3.amazonaws.com/5d23047f5f9fb67311528f06/a504ad34f00f369553e5fdeb70e7fed0/50.png",
  },
];

function CardInfo(props) {
  const [labelsDropdown, setlabelsDropdown] = useState(false);
  const [usersDropdown, setUsersDropdown] = useState(false);
  const [values, setValues] = useState({ ...props.card });

  const getSelectedColor = (color) => {
    handleAddLabel(color.text, color.color);
  };

  const handleAddLabel = (value, color) => {
    const index = values.labels?.findIndex((item) => item.text === value);
    if (index > -1) return;
    const label = {
      text: value,
      color: color,
    };
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
  };

  const handleRemoveLabel = (text) => {
    const tempLabels = values.labels.filter((item) => item.text !== text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  const handleAddUser = (user) => {
    setValues({
      ...values,
      assignedUser: user,
    });
  };

  const handleRemoveUser = () => {
    setValues({ ...values, assignedUser: "" });
  };

  useEffect(() => {
    if (props.updateCard)
      return props.updateCard(props.boardIndex, props.card.id, values);
  }, [values]);

  return (
    <Modal onClose={() => props.onClose()}>
      <button className="cardinfo_box_close" onClick={() => props.onClose()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_body">
            <div className="cardinfo_box_title">
              <FontAwesomeIcon icon={faHeading} />
              <p>Title</p>
            </div>
            <div className="cardinfo_box_editable_container">
              <Editable
                defaultValue={values.title}
                placeholder="Enter title"
                text={values.title}
                onSubmit={(value) => setValues({ ...values, title: value })}
              />
            </div>
            <div className="cardinfo_box_colors">
              {values.assignedUser && (
                <>
                  <h6>Members</h6>
                  <div className="cardinfo_members_list">
                    <img
                      src={values.assignedUser?.url}
                      alt={values.assignedUser?.name}
                    />
                    <p>{values.assignedUser?.name}</p>
                    <button
                      onClick={handleRemoveUser}
                      className="cardinfo_remove_user"
                    >
                      x
                    </button>
                  </div>
                </>
              )}
              {values.labels && (
                <>
                  <h6>Labels</h6>
                  <div className="cardinfo_box_selected">
                    {values.labels?.map((item, index) => (
                      <Chip
                        text={item.text}
                        color={item.color}
                        closeIcon
                        removeChip={() => handleRemoveLabel(item.text)}
                        key={(item, item + index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="cardinfo_box_title">
              <FontAwesomeIcon icon={faList} />
              <p>Description</p>
            </div>
            <div className="cardinfo_box_editable_container">
              <Editable
                defaultValue={
                  values.description
                    ? values.description
                    : "Enter your card description..."
                }
                placeholder="Enter Description"
                text={
                  values.description
                    ? values.description
                    : "Enter your card description..."
                }
                isTextArea
                onSubmit={(value) =>
                  setValues({ ...values, description: value })
                }
              />
            </div>
          </div>
          <div className="cardinfo_box_sidebar">
            <div className="cardinfo_box_labels_wrapper">
              <button
                className="cardinfo_box_labels_btn"
                onClick={() => setlabelsDropdown(true)}
              >
                <FontAwesomeIcon icon={faTag} /> &nbsp;Labels
              </button>
              {labelsDropdown && (
                <div className="cardinfo_box_wrapper">
                  <div className="cardinfo_box_wrapper_title">
                    <p>Labels</p>
                    <button onClick={() => setlabelsDropdown(false)}>
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                  </div>
                  <ul>
                    {colors.map((item, index) => (
                      <li
                        key={index}
                        style={{ backgroundColor: item.color }}
                        onClick={() => getSelectedColor(item)}
                      >
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="cardinfo_box_user_wrapper">
                <button
                  className="cardinfo_box_user_btn"
                  onClick={() => setUsersDropdown(true)}
                >
                  <FontAwesomeIcon icon={faUser} /> &nbsp;Members
                </button>
                {usersDropdown && (
                  <div className="cardinfo_box_wrapper">
                    <div className="cardinfo_box_wrapper_title">
                      <p>Members</p>
                      <button onClick={() => setUsersDropdown(false)}>
                        <FontAwesomeIcon icon={faClose} />
                      </button>
                    </div>
                    <ul>
                      {users.map((item, index) => (
                        <li
                          key={index}
                          style={{ backgroundColor: item.color }}
                          onClick={() => handleAddUser(item)}
                        >
                          <img src={item.url} alt={item.name} />
                          <p>{item.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
