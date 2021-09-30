const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  },
});

Page.beforeValidate((page) => {
  page.slug = slugify(page.title);
  console.log(page.slug);
});

function slugify(str) {
  return str
    .split(` `)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(`_`);
}

module.exports = {
  db,
  Page,
  User,
};
