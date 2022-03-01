import React from 'react';

function NewsListItems({name, onDelete, description, category}) {
  let elementClassName;
  switch (category) {
    case "Hot news":
      elementClassName = "bg-danger bg-gradient";
      break;
    case "Sport news":
      elementClassName = "bg-primary bg-gradient";
      break;
    case "World news":
      elementClassName = "bg-success bg-gradient";
      break;

    default:
      elementClassName = "bg-info bg-gradient";
  }
  
  return (
    <li
      className={`card flex-row shadow-lg text-white my-3 ${elementClassName}`}
    >
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <p className="card-text">{description}</p>
      </div>
      <img
        src="https://media.istockphoto.com/photos/highland-lynx-kitten-picture-id183882515?b=1&k=20&m=183882515&s=170667a&w=0&h=EjMi1dClqx4Man_rf7VK2l9yC7aXnVLwkFmUvLbuEmk="
        alt="News img"
        className="img-fluid w-25 d-inline"
        style={{ objectFit: "cover" }}
      />
      <span className="position-absolute top-0 end-90 translate-middle badge border rounded-pill bg-light">
        <button
          onClick={onDelete}
          type="button"
          className="btn-close"
          aria-label="Close"
        ></button>
      </span>
    </li>
  );
}

export default NewsListItems;