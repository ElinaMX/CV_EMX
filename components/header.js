class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
      <header>
    <nav class="navbar navbar-expand-sm navbar-dark fixed-top"  style="background-color: #0668B3;">
        <div class="container justify-content-center">
            <a href="index.html" class="navbar-brand mb-0 h1">
  
            </a>

            <button type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" class="navbar-toggler"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse flex-grow-0" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a href="#bio" class="nav-link">
                            Bio
                            </a>
                    </li>
                    <li class="nav-item">
                        <a href="#dev" class="nav-link">
                            Développement
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#publi" class="nav-link">
                            Publications
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#forma" class="nav-link">
                            Enseignement & formation
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#com" class="nav-link">
                            Communication
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#contact" class="nav-link">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
    `;
    }
}

customElements.define('header-component', Header);