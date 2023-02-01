import React from "react";
import { Card, Button, Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import ShowModal from "./ShowModal";

function Show({ show }) {
  const [showModal, setShowModal] = React.useState(false);
  const handleUpdate = () => {};
  const handleDelete = () => {};
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Card className="my-3 p-3 rounded" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title as="div">
            <h4>{show.title}</h4>
          </Card.Title>
          <Card.Text as="h6">{show.streamingApp}</Card.Text>
          <Card.Text as="div">
            <div className="my-3">
              <ReactStars
                value={show.rating}
                edit={false}
                isHalf={true}
                count={5}
              />
              <span>{show.review}</span>
            </div>
          </Card.Text>
          <div className="d-flex flex-sm-row">
            <Button variant="primary" size="sm" onClick={handleShow}>
              Update
            </Button>
            <Button variant="danger" size="sm" style={{ marginLeft: "5px" }}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
      <ShowModal
        watched={show}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        show={showModal}
      />
    </>
  );
}

export default Show;
