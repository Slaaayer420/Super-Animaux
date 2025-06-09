const { useState, useEffect } = React;

function App() {
  const [step, setStep] = useState(0);
  const [animal, setAnimal] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactMethod: "email"
  });

  const animals = [
    { name: "Chien", icon: "🐶", image: "dog" },
    { name: "Chat", icon: "🐱", image: "cat" },
    { name: "Oiseau", icon: "🐦", image: "bird" },
    { name: "Lapin", icon: "🐰", image: "rabbit" },
  ];

  const services = [
    "Check-up complet",
    "Coupe de griffes",
    "Vaccination annuelle",
    "Urgence médicale",
    "Toilettage premium",
    "Détartrage dentaire"
  ];

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [step]);

  const calculateProgress = () => {
    if (step === 0) return "0%";
    if (step === 1) return "33%";
    if (step === 2) return "66%";
    return "100%";
  };

  const handleSubmit = () => {
    if (!service || !date || !ownerInfo.firstName || !ownerInfo.lastName || !ownerInfo.email) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    setStep(3);
  };

  const resetForm = () => {
    setStep(0);
    setAnimal("");
    setService("");
    setNotes("");
    setDate("");
    setOwnerInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      contactMethod: "email"
    });
  };

  return (
    <div className={isAnimating ? "page-transition" : ""}>
      <header>
        <h1><i className="fas fa-paw"></i> SuperAnimaux</h1>
        <p>Des soins d'exception pour vos compagnons</p>
      </header>
      
      <main>
        <div className="progress-steps">
          <div className="progress-bar" style={{ width: calculateProgress() }}></div>
          <div className={`step ${step >= 0 ? 'active' : ''} ${step > 0 ? 'completed' : ''}`}>
            <div className="step-number">{step > 0 ? <i className="fas fa-check"></i> : "1"}</div>
            <div className="step-label">Accueil</div>
          </div>
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">{step > 1 ? <i className="fas fa-check"></i> : "2"}</div>
            <div className="step-label">Animal</div>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">{step > 2 ? <i className="fas fa-check"></i> : "3"}</div>
            <div className="step-label">Détails</div>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">4</div>
            <div className="step-label">Confirmation</div>
          </div>
        </div>

        {step === 0 && (
          <div className="card">
            <h2>Bienvenue chez SuperAnimaux</h2>
            <p>Prenez rendez-vous en ligne pour offrir à votre animal les meilleurs soins vétérinaires.</p>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button onClick={() => setStep(1)}>
                <i className="fas fa-calendar-alt"></i> Prendre un rendez-vous
              </button>
            </div>
            
            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center', margin: '1rem' }}>
                <i className="fas fa-shield-alt" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
                <p style={{ marginTop: '0.5rem' }}>Soins préventifs</p>
              </div>
              <div style={{ textAlign: 'center', margin: '1rem' }}>
                <i className="fas fa-heartbeat" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
                <p style={{ marginTop: '0.5rem' }}>Urgences 24/7</p>
              </div>
              <div style={{ textAlign: 'center', margin: '1rem' }}>
                <i className="fas fa-user-md" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
                <p style={{ marginTop: '0.5rem' }}>Experts qualifiés</p>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="card">
            <h2>Pour quel animal ?</h2>
            <p>Sélectionnez le type d'animal pour lequel vous souhaitez prendre rendez-vous.</p>
            
            <div className="animal-grid">
              {animals.map((a) => (
                <div 
                  key={a.name}
                  className={`animal-card ${animal === a.name ? 'selected' : ''}`}
                  onClick={() => {
                    setAnimal(a.name);
                    setStep(2);
                  }}
                >
                  <span className="animal-icon">{a.icon}</span>
                  <span className="animal-name">{a.name}</span>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button className="secondary" onClick={() => setStep(0)}>
                <i className="fas fa-arrow-left"></i> Retour
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <h2>Détails du rendez-vous</h2>
            <p>Complétez les informations pour votre {animal}.</p>
            
            <div className="owner-info-section">
              <h3><i className="fas fa-user"></i> Informations du propriétaire</h3>
              
              <div className="input-group">
                <label htmlFor="firstName">Prénom *</label>
                <input 
                  id="firstName"
                  type="text" 
                  value={ownerInfo.firstName}
                  onChange={(e) => setOwnerInfo({...ownerInfo, firstName: e.target.value})}
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="lastName">Nom *</label>
                <input 
                  id="lastName"
                  type="text" 
                  value={ownerInfo.lastName}
                  onChange={(e) => setOwnerInfo({...ownerInfo, lastName: e.target.value})}
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="email">Email *</label>
                <input 
                  id="email"
                  type="email" 
                  value={ownerInfo.email}
                  onChange={(e) => setOwnerInfo({...ownerInfo, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="phone">Téléphone</label>
                <input 
                  id="phone"
                  type="tel" 
                  value={ownerInfo.phone}
                  onChange={(e) => setOwnerInfo({...ownerInfo, phone: e.target.value})}
                />
              </div>
              
              <h3><i className="fas fa-comments"></i> Préférence de contact</h3>
              <div className="contact-method">
                <input 
                  type="radio" 
                  id="contact-email" 
                  name="contactMethod" 
                  value="email"
                  checked={ownerInfo.contactMethod === "email"}
                  onChange={() => setOwnerInfo({...ownerInfo, contactMethod: "email"})}
                />
                <label htmlFor="contact-email">
                  <i className="fas fa-envelope"></i> Email
                </label>
                
                <input 
                  type="radio" 
                  id="contact-phone" 
                  name="contactMethod" 
                  value="phone"
                  checked={ownerInfo.contactMethod === "phone"}
                  onChange={() => setOwnerInfo({...ownerInfo, contactMethod: "phone"})}
                />
                <label htmlFor="contact-phone">
                  <i className="fas fa-phone"></i> Téléphone
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="service"><i className="fas fa-stethoscope"></i> Type de service *</label>
              <select 
                id="service"
                value={service} 
                onChange={(e) => setService(e.target.value)}
                required
              >
                <option value="">-- Sélectionner un service --</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="notes"><i className="fas fa-edit"></i> Notes supplémentaires :</label>
              <textarea
                id="notes"
                placeholder="Décrivez brièvement les symptômes ou demandes particulières..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="date"><i className="fas fa-calendar-day"></i> Date souhaitée *</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button className="secondary" onClick={() => setStep(1)}>
                <i className="fas fa-arrow-left"></i> Retour
              </button>
              <button onClick={handleSubmit}>
                <i className="fas fa-check"></i> Confirmer
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card confirmation">
            <div className="confirmation-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Rendez-vous confirmé !</h2>
            <p>Merci pour votre réservation. Voici le récapitulatif :</p>
            
            <div style={{ textAlign: 'left', maxWidth: '400px', margin: '2rem auto' }}>
              <div className="detail-item">
                <p><strong>Propriétaire :</strong> {ownerInfo.firstName} {ownerInfo.lastName}</p>
              </div>
              <div className="detail-item">
                <p><strong>Contact :</strong> {ownerInfo.contactMethod === "email" ? ownerInfo.email : ownerInfo.phone}</p>
              </div>
              <div className="detail-item">
                <p><strong>Animal :</strong> {animal}</p>
              </div>
              <div className="detail-item">
                <p><strong>Service :</strong> {service}</p>
              </div>
              <div className="detail-item">
                <p><strong>Date :</strong> {new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="detail-item">
                <p><strong>Notes :</strong> {notes || "Aucune note supplémentaire"}</p>
              </div>
            </div>
            
            <p style={{ marginTop: '1.5rem' }}>
              <i className="fas fa-envelope"></i> Un email de confirmation vous a été envoyé à {ownerInfo.email}.
            </p>
            
            <button onClick={resetForm} style={{ marginTop: '2rem' }}>
              <i className="fas fa-home"></i> Retour à l'accueil
            </button>
          </div>
        )}
      </main>
      
      <footer>
        <div style={{ marginBottom: '1rem' }}>
          <i className="fas fa-phone" style={{ marginRight: '0.5rem' }}></i> 01 23 45 67 89
          <span style={{ margin: '0 1rem' }}>|</span>
          <i className="fas fa-map-marker-alt" style={{ marginRight: '0.5rem' }}></i> 123 Rue des Animaux, Paris
        </div>
        <div>
          <a href="#" style={{ color: 'white', margin: '0 0.5rem' }}><i className="fab fa-facebook-f"></i></a>
          <a href="#" style={{ color: 'white', margin: '0 0.5rem' }}><i className="fab fa-instagram"></i></a>
          <a href="#" style={{ color: 'white', margin: '0 0.5rem' }}><i className="fab fa-twitter"></i></a>
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: '0.8' }}>
          © {new Date().getFullYear()} SuperAnimaux - Tous droits réservés
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
