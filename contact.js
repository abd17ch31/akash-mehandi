(function () {
  "use strict";

  var form = document.getElementById("bookingForm");
  var note = document.getElementById("formNote");
  if (!form) {
    return;
  }

  var businessPhone = "919758965979";
  var requiredFields = ["fullName", "phoneNumber", "eventType", "eventDate", "eventLocation", "guestCount"];

  function normalizePhone(raw) {
    return raw.replace(/[^\d+]/g, "").trim();
  }

  function setError(message) {
    if (note) {
      note.textContent = message;
    }
  }

  function validateForm() {
    var isValid = true;

    requiredFields.forEach(function (fieldId) {
      var field = document.getElementById(fieldId);
      if (!field) return;

      if (!String(field.value).trim()) {
        field.setAttribute("aria-invalid", "true");
        isValid = false;
      } else {
        field.setAttribute("aria-invalid", "false");
      }
    });

    var phoneField = document.getElementById("phoneNumber");
    if (phoneField) {
      var cleaned = normalizePhone(phoneField.value).replace(/^\+/, "");
      if (cleaned.length < 10) {
        phoneField.setAttribute("aria-invalid", "true");
        isValid = false;
      }
    }

    return isValid;
  }

  function formatDate(dateValue) {
    if (!dateValue) return "";
    var d = new Date(dateValue + "T00:00:00");
    if (Number.isNaN(d.getTime())) return dateValue;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setError("");

    if (!validateForm()) {
      setError("Please fill all required fields with valid details.");
      return;
    }

    var fullName = document.getElementById("fullName").value.trim();
    var phoneNumber = document.getElementById("phoneNumber").value.trim();
    var eventType = document.getElementById("eventType").value.trim();
    var eventDate = formatDate(document.getElementById("eventDate").value.trim());
    var eventLocation = document.getElementById("eventLocation").value.trim();
    var guestCount = document.getElementById("guestCount").value.trim();
    var message = document.getElementById("message").value.trim();

    var text = [
      "Hello, I would like to book mehndi services.",
      "",
      "Name: " + fullName,
      "Phone: " + phoneNumber,
      "Event Type: " + eventType,
      "Event Date: " + eventDate,
      "Location: " + eventLocation,
      "Guests: " + guestCount,
      "",
      "Message:",
      message || "N/A"
    ].join("\n");

    var whatsappUrl = "https://wa.me/" + businessPhone + "?text=" + encodeURIComponent(text);
    window.location.href = whatsappUrl;
  });
})();
