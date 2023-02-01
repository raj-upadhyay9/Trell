import React from "react";
import ReactStars from "react-rating-stars-component";
import { Modal, Button } from "react-bootstrap";

const ShowModal = ({ create, watched, show, handleClose, handleUpdate }) => {
  const [series, setSeries] = React.useState({
    title: watched.title,
    streamingApp: watched.streamingApp,
    rating: watched.rating,
    review: watched.review,
  });

  const [modalName, setModalName] = React.useState(
    create ? "Create" : "Update"
  );

  const handleChange = (name, value) => {
    setSeries({
      ...series,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    handleUpdate(series);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalName} {series.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={series.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Streaming App</label>
            <input
              type="text"
              className="form-control"
              value={series.streamingApp}
              onChange={(e) => handleChange("streamingApp", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <ReactStars
              value={series.rating}
              onChange={(value) => handleChange("rating", value)}
              isHalf={true}
              count={5}
            />
          </div>
          <div className="form-group">
            <label>Review</label>
            <input
              type="text"
              className="form-control"
              value={series.review}
              onChange={(e) => handleChange("review", e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowModal;
