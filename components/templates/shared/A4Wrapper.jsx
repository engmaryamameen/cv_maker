const A4Wrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    if (!preview) return;
    const previewHeight = preview.offsetHeight;
    if (previewHeight > 1122) {
      alert("A4 size exceeded");
    }
  };

  return (
    <div className="w-8.5in mb-16" onLoad={alertA4Size}>
      {children}
    </div>
  );
};

export default A4Wrapper;
