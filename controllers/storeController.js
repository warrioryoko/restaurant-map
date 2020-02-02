const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  console.log(req.name);
  req.flash('error', 'Something Happened');
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`store/${store.slug}`);
}

exports.getStores = async (req, res) => {
  // 1. Query database for list of stores
  const stores = await Store.find();
  res.render('stores', {title: 'Stores', stores});
}

exports.editStore = async (req, res) => {
  // 1. Find store, given the ID
  const store = await Store.findOne({ _id: req.params.id });
  // 2. Confirm the user is the owner of the store
  // TODO
  // 3. Render the edit form so users can update their store
  res.render('editStore', { title: `Edit ${store.name}`, store });
}

exports.updateStore = async (req, res) => {
  // 1. Find and update store
  // const store = Store.findOneAndUpdate(q ,data, options);
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, { 
    new: true, //return the new store instead of the old one
    runValidators: true
  }).exec();
  // 2. Redirect user to the store, flash that it worked
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store -></a>`);
  res.redirect(`/stores/${store._id}/edit`);
}