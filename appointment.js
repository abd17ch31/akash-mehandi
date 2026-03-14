(function () {
  "use strict";

  var form = document.getElementById("appointmentForm");
  var message = document.getElementById("formMessage");
  var whatsappNumber = "919758965979";

  if (!form || !message) {
    return;
  }

  var requiredFieldIds = [
    "fullName",
    "emailAddress",
    "phoneNumber",
    "eventType",
    "eventDate"
  ];

  function setMessage(text, type) {
    message.textContent = text;
    message.classList.remove("is-error", "is-success");

    if (type) {
      message.classList.add(type === "success" ? "is-success" : "is-error");
    }
  }

  function markFieldValidity(field, isValid) {
    field.setAttribute("aria-invalid", isValid ? "false" : "true");
  }

  function validateRequiredFields() {
    var valid = true;

    requiredFieldIds.forEach(function (fieldId) {
      var field = document.getElementById(fieldId);

      if (!field) {
        return;
      }

      var hasValue = String(field.value).trim() !== "";
      markFieldValidity(field, hasValue);

      if (!hasValue) {
        valid = false;
      }
    });

    return valid;
  }

  function buildWhatsappMessage() {
    var fullName = document.getElementById("fullName").value.trim();
    var emailAddress = document.getElementById("emailAddress").value.trim();
    var phoneNumber = document.getElementById("phoneNumber").value.trim();
    var eventType = document.getElementById("eventType").value.trim();
    var eventDate = document.getElementById("eventDate").value.trim();
    var cityLocation = document.getElementById("cityLocation").value.trim() || "Not provided";
    var guestCount = document.getElementById("guestCount").value.trim() || "Not provided";
    var additionalMessage = document.getElementById("additionalMessage").value.trim() || "Not provided";

    return [
      "Hello Akash Bridal Mehndi, I would like to book an appointment.",
      "",
      "Full Name: " + fullName,
      "Email Address: " + emailAddress,
      "Phone Number: " + phoneNumber,
      "Event Type: " + eventType,
      "Event Date: " + eventDate,
      "City / Location: " + cityLocation,
      "Number of Guests: " + guestCount,
      "Additional Message: " + additionalMessage
    ].join("\n");
  }

  requiredFieldIds.forEach(function (fieldId) {
    var field = document.getElementById(fieldId);

    if (!field) {
      return;
    }

    field.addEventListener("input", function () {
      if (String(field.value).trim() !== "") {
        markFieldValidity(field, true);
      }

      if (message.classList.contains("is-error")) {
        setMessage("", "");
      }
    });

    field.addEventListener("change", function () {
      if (String(field.value).trim() !== "") {
        markFieldValidity(field, true);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var isValid = validateRequiredFields();

    if (!isValid) {
      setMessage("Please fill out all required fields.", "error");
      return;
    }

    var whatsappMessage = buildWhatsappMessage();
    var whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappMessage);

    setMessage("Redirecting you to WhatsApp with your appointment details...", "success");
    window.open(whatsappUrl, "_blank");

    form.reset();

    requiredFieldIds.forEach(function (fieldId) {
      var field = document.getElementById(fieldId);

      if (field) {
        field.setAttribute("aria-invalid", "false");
      }
    });
  });

  function applyViewportMode() {
    if (window.innerWidth <= 768) {
      document.body.setAttribute("data-compact", "true");
    } else {
      document.body.removeAttribute("data-compact");
    }
  }

  applyViewportMode();
  window.addEventListener("resize", applyViewportMode);
})();
