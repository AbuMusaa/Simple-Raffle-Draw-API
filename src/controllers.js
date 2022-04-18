const ticketCollection = require("./tickets");

/// TICKET SELLING/CREATING CONTROLLERS
// Sell single Ticket
exports.sellSingleTicket = (req, res) => {
  const { username, price } = req.body;
  const ticket = ticketCollection.create(username, price);

  res.status(201).json({
    status: "success",
    ticket,
  });
};

// Sell bulk Tickets
exports.sellBulkTicket = (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = ticketCollection.createBulk(username, price, quantity);

  res.status(201).json({
    status: "success",
    tickets,
  });
};

///  TICKET FIND CONTROLLERS
// Find all Tickets
exports.findAll = (req, res) => {
  const tickets = ticketCollection.find();

  res.status(200).json({
    status: "success",
    data: {
      total: tickets.length,
      tickets,
    },
  });
};

// Find ticket by ID
exports.findById = (req, res) => {
  const id = req.params.id;
  const ticket = ticketCollection.findById(id);

  if (!ticket) {
    return res.json(404).json({
      status: "fail",
      message: "404 not found!",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
};

// Find ticket by username
exports.findByUsername = (req, res) => {
  const username = req.params.username;
  const tickets = ticketCollection.findByUsername(username);

  res.status(200).json({
    status: "success",
    total: tickets.length,
    data: {
      tickets,
    },
  });
};

/// TICKET UPDATE CONTROLLERS
// Update by id
exports.updateById = (req, res) => {
  const id = req.params.id;
  const ticket = ticketCollection.updateById(id, req.body);

  if (!ticket) {
    return res.status(404).json({
      status: "fail",
      message: "Ticket not found!",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
};

// Update by username
exports.updateByUsername = (req, res) => {
  const username = req.params.username;
  const tickets = ticketCollection.updateBulk(username, req.body);

  res.status(200).json({
    status: "success",
    total: ticket.length,
    data: {
      tickets,
    },
  });
};

/// DELETE CONTROLLERS
// Delete by id
exports.deleteById = (req, res) => {
  const id = req.params.id;
  const isDeleted = ticketCollection.deleteById(id);

  if (!isDeleted) {
    return res.status(400).json({
      status: "fail",
      message: "Delte oparation failed!",
    });
  }

  // res.status(204).send()

  res.status(204).json({
    status: "success",
    data: null,
  });
};

// Delete by username
exports.deleteByUsername = (req, res) => {
  const username = req.params.username;
  ticketCollection.deleteBulk(username);

  res.status(204).json({
    status: "success",
    data: null,
  });
};

// Draw controller
exports.drawWinners = (req, res) => {
  const winnerCounts = req.query.winnerCounts ?? 3;
  const winner = ticketCollection.draw(winnerCounts);

  res.status(200).json({
    stats: "success",
    data: {
      winner,
    },
  });
};
