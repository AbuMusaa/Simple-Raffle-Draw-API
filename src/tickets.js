const Ticket = require("./Ticket");
const { readFile, writeFile } = require("./util");

const tickets = Symbol("tickets");

// Ticket Collection class
class TicketCollection {
  constructor() {
    this[tickets] = [];

    (async function () {
      this[tickets] = await readFile();
    }.call(this));
  }

  /**
   * Create a Ticket by username and price
   * @param {string} username
   * @param {number} price
   * @returns {Ticket} Ticket
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this[tickets].push(ticket);
    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * Create Bulk ticket
   * @param {string} usernam
   * @param {number} price
   * @param {number} quantity
   * @return {Ticket[]}
   */
  createBulk(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }
    writeFile(this[tickets]);
    return result;
  }

  /**
   * Return all tickets
   * @returns {tickets[]} Ticket
   */
  find() {
    return this[tickets];
  }

  /**
   * find ticket by id
   * @param {string} ticketId
   * @returns {Ticket} Ticket
   */
  findById(ticketId) {
    const ticket = this[tickets].find((ticket) => ticket.id === ticketId);

    return ticket;
  }

  /**
   * find ticket by username
   * @param {string} username
   * @returns {Ticket[]}
   */
  findByUsername(username) {
    const userTickets = this[tickets].filter(
      (ticket) => ticket.username === username
    );
    return userTickets;
  }

  /**
   * update ticket by id
   * @param {string} ticketId
   * @param {{usernam: string, price: number}} ticketBody
   * @return {Ticket}
   */
  updateById(ticketId, ticketBody) {
    const ticket = this.findById(ticketId);
    if (ticket) {
      ticket.username = ticketBody.username ?? ticket.username;
      ticket.price = ticketBody.price ?? ticket.price;
    }
    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * update bulk ticket by username
   * @param {string} username
   * @param {{usernam: string, price: number}} ticketBody
   * @return {Ticket[]}
   */
  updateBulk(username, ticketBody) {
    const userTickets = this.findByUsername(username);
    const updatedTickets = userTickets.map((ticket) => {
      this.updateById(ticket.id, ticketBody);
    });
    writeFile(this[tickets]);
    return updatedTickets;
  }

  /**
   * delete ticket by id
   * @param {string} ticketId
   * @return {boolean}
   */
  deleteById(ticketId) {
    const index = this[tickets].findIndex((ticket) => ticket.id === ticketId);

    if (index === -1) {
      return false;
    } else {
      this[tickets].splice(index, 1);
      writeFile(this[tickets]);
      return true;
    }
  }

  /**
   *
   * @param {string} username
   * @returns {boolean[]}
   */
  deleteBulk(username) {
    const userTickets = this.findByUsername(username);
    const deletedResult = userTickets.map((ticket) => {
      this.deleteById(ticket.id);
    });
    writeFile(this[tickets]);
    return deletedResult;
  }

  /**
   * find winners
   * @param {number} winnerCount
   * @returns {Ticket[]}
   */
  draw(winnerCount) {
    const winnerIndexes = new Array(winnerCount);

    let winnerIndex = 0;
    while (winnerIndex > winnerCount) {
      let ticketIndex = Math.floor(Math.random() * this[tickets].length);
      if (!winnerIndexes.includes(ticketIndex)) {
        winnerIndexes[winnerIndex++] = ticketIndex;
        continue;
      }
    }

    const winners = winnerIndexes.map((index) => this[tickets][index]);

    return winners;
  }
}

const ticketCollection = new TicketCollection();

module.exports = ticketCollection;
