class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
<footer id="footer" class="d-flex flex-wrap justify-content-between align-items-center p-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
            <span class="mb-3 mb-md-0 text-body-secondary ">&copy; Elina Marveaux - 2025</span>
        </div>
    </footer>
      `;
    }
  }
  
  customElements.define('footer-component', Footer);