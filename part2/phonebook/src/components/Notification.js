const Notification = ({ message, errorClass }) => {
  if (message == null) {
    return null;
  }
  let classDesignation = "notification";
  if (errorClass) {
    classDesignation += ` ${errorClass}`;
  }
  return <div className={classDesignation}>{message}</div>;
};

export default Notification;
