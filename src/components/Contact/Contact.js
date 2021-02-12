import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './Contact.css'

const Contact = () => {
  return (
    <div className="container-fluid">
      <p id="author" className="text-center text-light mx-auto mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">By Gabit</p>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h5 className="modal-title" id="exampleModalLabel">Contact</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <a href="https://github.com/gabit690" target="_blank"><i className="bi bi-github"></i></a>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <a href="https://linkedin.com/in/jg-valeriano" target="_blank"><i className="bi bi-linkedin"></i></a>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <a href="https://twitter.com/Gabit90" target="_blank"><i className="bi bi-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;