function doDelete(id) {
  $.ajax({
    method: "DELETE",
    url: "/delete",
    data: { _id: id },
    success: window.location.reload(),
    error: function (error) {
      alert(error);
    },
  });
}

