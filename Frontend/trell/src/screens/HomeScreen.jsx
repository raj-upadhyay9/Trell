import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import Show from "../components/Show";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listShows } from "../actions/showActions";
import ShowModal from "../components/ShowModal";

function HomeScreen() {
  const dispatch = useDispatch();
  const showList = useSelector((state) => state.showList);
  const { error, loading, shows, page, pages } = showList;
  console.log(showList, "showlist");

  const [showModal, setShowModal] = React.useState(false);
  const handleCreate = () => {};
  const handleDelete = () => {};
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const series = {
    title: "",
    streamingApp: "",
    rating: 0,
    review: "",
  };

  useEffect(() => {
    dispatch(listShows());
  }, [dispatch]);

  return (
    <>
      <div className="d-flex flex-row pd">
        <h1>Your Favorites:</h1>
        <Button
          variant="primary"
          size="lg"
          style={{ marginLeft: "5px" }}
          onClick={handleShow}
        >
          Add
        </Button>
        <ShowModal
          create={true}
          watched={series}
          handleClose={handleClose}
          handleUpdate={handleCreate}
          show={showModal}
        />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {shows.map((show) => (
              <Col key={show.id} sm={12} md={6} lg={4} xl={3}>
                <Show show={show} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} />
        </div>
      )}
    </>
  );
}

export default HomeScreen;
