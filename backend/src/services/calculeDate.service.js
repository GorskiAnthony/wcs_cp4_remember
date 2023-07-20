function calculerTempsRestant(anniversaire) {
  const dateAnniversaire = new Date(anniversaire);
  dateAnniversaire.setDate(dateAnniversaire.getDate() + 1);
  const dateAujourdhui = new Date();
  const prochainAnniversaire = new Date(
    dateAujourdhui.getFullYear(),
    dateAnniversaire.getMonth(),
    dateAnniversaire.getDate()
  );

  if (prochainAnniversaire < dateAujourdhui) {
    // Si l'anniversaire de cette année est déjà passé, on ajoute une année pour l'année suivante
    prochainAnniversaire.setFullYear(prochainAnniversaire.getFullYear() + 1);
  }

  const tempsRestant = prochainAnniversaire - dateAujourdhui;
  const jours = Math.floor(tempsRestant / (1000 * 60 * 60 * 24));

  return {
    jours,
  };
}

module.exports = {
  calculerTempsRestant,
};
