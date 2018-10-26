"use babel";

export default class AtomHetsIntegrationView {
  constructor() {
    // Create root element
    this.element = document.createElement("div");
    this.element.classList.add("atom-hets-integration");

    // Create message element
    const message = document.createElement("div");
    message.classList.add("message");
    this.element.appendChild(message);

    this.subscriptions = atom.workspace
      .getCenter()
      .observeActivePaneItem(item => {
        if (!atom.workspace.isTextEditor(item)) {
          message.innerText = "Please open a file.";
          return;
        }
        message.innerHTML = `${item.buffer.file.path}`;
      });
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      // This is used to look up the deserializer function. It can be any string, but it needs to be
      // unique across all packages!
      deserializer: "atom-hets-integration/AtomHetsIntegrationView"
    };
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getElement() {
    return this.element;
  }

  getTitle() {
    return "Development Graph";
  }

  getURI() {
    return "atom://atom-hets-integration-display-graph";
  }

  getDefaultLocation() {
    return "right";
  }

  getAllowedLocations() {
    return ["left", "right", "bottom"];
  }
}
