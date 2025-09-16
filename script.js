const form = document.querySelector(".contact-form");
    const inputs = form.querySelectorAll("input");

    form.addEventListener("submit", function(event) {
      event.preventDefault();

      let hasError = false;

      inputs.forEach((input, index) => {
        const errorMessage = input.nextElementSibling;

        // Reset states
        input.classList.remove("error");
        errorMessage.classList.remove("active");

        if (input.value.trim() === "") {
          input.classList.add("error");
          errorMessage.classList.add("active");
          hasError = true;
        }
      });

      if (!hasError) {
        alert("Form submitted successfully ✅");
        // form.submit(); // enable if you want real submission
      }
    });