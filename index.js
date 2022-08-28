// Convert today date to input format
const today = new Date().toISOString().split("T")[0];
start_date.value = today;
start_date.min = today;

// Tomorrow date calc
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// Convert to input format
let tomorrowFormat = tomorrow.toISOString().split("T")[0];
end_date.value = tomorrowFormat;
end_date.min = tomorrowFormat;

start_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value);

  if (end_date.value < start_date.value) {
    day.setDate(day.getDate() + 1);
    end_date.value = day.toISOString().split("T")[0];
  }
});

end_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value);

  if (end_date.value < start_date.value) {
    day.setDate(day.getDate() - 1);
    start_date.value = day.toISOString().split("T")[0];
  }
});

const bookingCalc = () => {
  let diffTime = Math.abs(
    new Date(end_date.value) - new Date(start_date.value)
  );
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  totalPerNight.textContent = diffDays * nightPrice.textContent;
};

start_date.addEventListener("change", bookingCalc);
end_date.addEventListener("change", bookingCalc);
bookingCalc();

form_date.addEventListener("submit", (e) => {
  const dateFormater = (date) => {
    const [y, m, d] = date.split("-");
    return [d, m, y].join("/");
  };

  e.preventDefault();
  if (totalPerNight.textContent === "0") {
    alert("Veuillez sélectionner un créneau valide !");
  } else {
    alert(
      `Votre réservation du ${dateFormater(start_date.value)} au ${dateFormater(
        end_date.value
      )} pour un montant de ${
        totalPerNight.textContent
      } euros a bien été enregistrée.`
    );
    start_date.value = today;
    end_date.value = tomorrowFormat;
    totalPerNight.textContent = nightPrice.textContent;
  }
});
