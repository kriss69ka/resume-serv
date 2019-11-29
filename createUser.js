function createUser(userInfo) {
  const [name, surname] = userInfo.fio.split(" ");
  const { uid, email } = userInfo;

  const initialUserInfo = {
    id: uid,
    lastName: surname,
    firstName: name,
    dateBirth: "",
    profession: "",
    text: "",
    imgUrl: "",
    address: "",
    aboutMeText: "",
    phone: "",
    email: email,
    linkIg: "",
    linkGithub: "",
    linkVk: "",
    education: [],
    work: [],
    skills: []
  };

  return initialUserInfo;
}

module.exports = createUser;
