//FORMS

var itemsList;
//Retrieving the items from the API.
const getItems = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/items", {
      mode: "cors",
    });
    itemsList = await response.json();
    itemsList.forEach((item) => {
      $("select").append(
        '<option value="' + item.id + '">' + item.name + "</option>"
      );
    });
    $("select").prepend(
      '<option value="" disabled selected>Choose your item</option>'
    );
    $("select").formSelect();
  } catch (error) {
    M.toast({ html: "Error, Can't load items : " + error, classes: "red" });
  }
};

//Updating the price when an item is selected
$("#id_item").on("change", function () {
  $("#price").val(itemsList.find((item) => item.id == this.value).defaultPrice);
  M.updateTextFields();
});

//Validation & API calls.
$("form").submit(async function (e) {
  e.preventDefault();
  var validation = true;
  const data = {
    nameClient: $("#last_name").val(),
    firstnameClient: $("#first_name").val(),
    item: $("#id_item").val(),
    quantity: $("#quantity").val(),
    totalPrice: $("#price").val() * $("#quantity").val(),
  };

  //
  if ($("#quantity").val() < 1) {
    $("#quantity").addClass("invalid");
    M.toast({
      html: "Error : Quantity must be greater than 0",
      classes: "red",
    });
    validation = false;
  }

  if ($("#id_item").val() == null) {
    M.toast({ html: "Error : An item must be selected", classes: "red" });
    validation = false;
  }

  if (validation) {
    try {
      await fetch("http://localhost:3000/api/logs", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(data),
      });

      M.toast({ html: "Order submitted successfully!", classes: "green" });
    } catch (error) {
      M.toast({ html: "Error : " + error, classes: "red" });
    }
  }
});

//LOGS

//Retrieving the items from the API.
const getLogs = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/logs", {
      mode: "cors",
    });
    const logsList = await response.json();

    $("tbody").empty();
    logsList.forEach((log) => {
      const dateLog = new Date(log.created).toUTCString();
      $("tbody").append(
        "<tr><td>" +
          log.firstnameClient +
          "</td><td>" +
          log.nameClient +
          "</td><td>" +
          log.expand.item.name +
          " </td><td>" +
          log.quantity +
          "</td><td>" +
          log.totalPrice +
          "</td><td>" +
          dateLog +
          "</td></tr>"
      );
    });
    $(".progress").remove();
  } catch (error) {
    M.toast({
      html: "Error, Can't load items : " + error,
      classes: "red",
    });
  }
};

$("#refresh").on("click", getLogs);

