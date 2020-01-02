import React, { Component } from "react";
import axios from "axios";
import { NavBar, TypeButton, SignupInput, MainButton } from "../../Components";

import Slide from "@material-ui/core/Slide";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Avatar from "@material-ui/core/Avatar";
import { purple } from "@material-ui/core/colors";

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";
import default_profile from "../../Assets/images/default_profile.svg";

const defaultProps = {};
const propTypes = {};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repassword: "",
      name: "",
      status: "",
      helpEmail: "Enter your email address please",
      helpPwd: "Enter your password",
      helpRePwd: "",
      helpName: "Enter your name please",
      usertype: null,
      profileImg: null,
      profileImgUrl: null,
      infoOpen: false,
      profileOpen: false,
      isInfoNext: false,
      isSignupNext: false,
      isEmailValid: true,
      isPwdValid: true,
      isRepwdValid: true,
      isNameValid: true,
      isStatusValid: true
    };
  }

  render() {
    const {
      helpEmail,
      helpPwd,
      helpRePwd,
      helpName,
      infoOpen,
      profileOpen,
      isInfoNext,
      isSignupNext,
      isEmailValid,
      isPwdValid,
      isRepwdValid,
      isNameValid,
      isStatusValid
    } = this.state;

    let slide_header;

    if (!(infoOpen || profileOpen)) {
      slide_header = (
        <div>
          <p className="signupPage__type-head">Choose your Art type.</p>
        </div>
      );
    } else if (infoOpen & !profileOpen) {
      slide_header = (
        <div className="signupPage__info-head">
          <div className="back">
            <a>
              <NavigateBeforeIcon
                style={{ color: purple[700], fontSize: 60 }}
                onClick={this.handleInfo}
              />
            </a>
          </div>

          <div className="title">
            <p>
              Hello, {this.state.usertype}! <br />
              Enter your personal information.
            </p>
          </div>
        </div>
      );
    } else if (profileOpen) {
      slide_header = (
        <div className="signupPage__info-head">
          <div className="back">
            <a>
              <NavigateBeforeIcon
                style={{ color: purple[700], fontSize: 60 }}
                onClick={this.handleProfile}
              />
            </a>
          </div>
          <div className="title">
            <p>Complete your profile.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="signupPage">
        <NavBar isActive="SignUp" />

        {slide_header}

        <Slide
          direction="up"
          in={!infoOpen}
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__type">
            <div className="signupPage__type-btn">
              <TypeButton
                title="Sketcher"
                value="sketcher"
                content="Share your artisic idea."
                logo={logo_sketcher}
                onClick={this.handleTypeSketcher}
              />
              <TypeButton
                title="Creator"
                value="sketcher"
                content="Share your creation."
                logo={logo_creator}
                onClick={this.handleTypeCreator}
              />
            </div>
          </div>
        </Slide>

        <Slide
          direction="up"
          in={infoOpen}
          mountOnEnter
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__info">
            <div className="signupPage__info-input">
              <SignupInput
                label="Email"
                type="email"
                width="210px"
                onChange={this.handleEmailCheck}
                error={!isEmailValid}
                helperText={helpEmail}
              />
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                disabled={!isEmailValid || this.state.email === ""}
                label="Password"
                type="password"
                width="210px"
                onChange={this.handlePwdCheck}
                error={!isPwdValid}
                helperText={helpPwd}
              />
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                disabled={
                  !isPwdValid || !isEmailValid || this.state.password === ""
                }
                label="Re-password"
                type="password"
                width="210px"
                onChange={this.handleRepwdCheck}
                onKeyPress={this.handleEnterKey}
                error={!isRepwdValid}
                helperText={isRepwdValid ? " " : helpRePwd}
              />
            </div>
            <div className="signupPage__info-next">
              <MainButton
                disabled={!isInfoNext}
                text="Next"
                onClick={this.handleProfile}
              />
            </div>
          </div>
        </Slide>
        <Slide
          direction="up"
          in={profileOpen}
          mountOnEnter
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__info">
            <div className="signupPage__info__img">
              <Avatar
                className="signupPage__info__img-preview"
                src={
                  this.state.profileImgUrl
                    ? this.state.profileImgUrl
                    : default_profile
                }
                style={{ width: "120px", height: "120px" }}
              />
              <div className="signupPage__info__img-upload">
                <input
                  accept="image/*"
                  type="file"
                  style={{ display: "none" }}
                  id="profile-upload"
                  name="img"
                  onChange={this.handleProfileImg}
                />
                <label htmlFor="profile-upload">
                  <MainButton
                    size="small"
                    component="span"
                    text="Choose Image"
                  />
                </label>
              </div>
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                id="standard-basic"
                label="name"
                type="text"
                width="210px"
                onChange={this.handleNameCheck}
                error={!isNameValid}
                helperText={helpName}
              />
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                id="standard-basic"
                label="status"
                type="text"
                width="210px"
                onChange={this.handleStatusCheck}
                onKeyPress={this.handleEnterKey}
                error={!isStatusValid}
              />
            </div>

            <div className="signupPage__info-signup">
              <MainButton
                disabled={!isSignupNext}
                text="Sign Up"
                onClick={this.handleSignup}
              />
            </div>
          </div>
        </Slide>
      </div>
    );
  }

  handlePwdCheck = e => {
    const regExp = /\S[0-9a-zA-Z]{7,16}$/;

    const condition = () => {
      const Isnum = /\S[0-9]/;
      const IsChar = /\S[a-zA-Z]/;
      const IsSpeical = /\W/g;
      const a = (bool, msg) => {
        this.setState({ isPwdValid: bool }, () => {
          this.setState({ helpPwd: msg }, () => {
            this.handleInfoNext();
          });
        });
      };
      if (
        (this.state.password !== "") &
        (8 <= this.state.password.length) &
        (this.state.password.length <= 16)
      ) {
        if (
          IsChar.test(this.state.password) & !Isnum.test(this.state.password)
        ) {
          return a(false, "Num should be contained");
        } else if (
          !IsChar.test(this.state.password) & Isnum.test(this.state.password)
        ) {
          return a(false, "Alphabet should be contained");
        } else if (IsSpeical.test(this.state.password)) {
          return a(false, "Special character not allowed");
        }
      } else if (
        (this.state.password !== "") &
        (this.state.password.length < 8)
      ) {
        return a(false, "Should be more than 8 words");
      } else if (
        (this.state.password !== "") &
        (this.state.password.length > 16)
      ) {
        return a(false, "Should no greater than 16 words");
      } else if (this.state.password === "") {
        return a(true, "Enter password please");
      }
    };

    this.setState({ password: e.target.value }, () => {
      if (regExp.test(this.state.password)) {
        this.setState({ isPwdValid: true }, () => {
          this.setState({ helpPwd: "Allowed password" }, () => {
            this.handleInfoNext();
            condition();
          });
        });
      } else {
        this.setState({ isPwdValid: false }, () => {
          this.handleInfoNext();
          condition();
        });
      }
    });
  };

  handleRepwdCheck = e => {
    this.setState({ repassword: e.target.value }, () => {
      if (
        this.state.repassword === "" ||
        this.state.password === this.state.repassword
      ) {
        this.setState({ isRepwdValid: true }, () => {
          this.handleInfoNext();
        });
      } else {
        this.setState({ isRepwdValid: false }, () => {
          this.setState({ helpRePwd: "Enter same password above" }, () => {
            this.handleInfoNext();
          });
        });
      }
    });
  };

  handleEmailCheck = e => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const a = (bool, msg) => {
      this.setState({ isEmailValid: bool }, () => {
        this.setState({ helpEmail: msg }, () => {
          this.handleInfoNext();
        });
      });
    };
    this.setState({ email: e.target.value }, () => {
      this.handleInfoNext();
      if (this.state.email === "") {
        a(true, "Enter email address please");
      } else if ((this.state.email !== "") & !regExp.test(this.state.email)) {
        a(false, "Incorrect Email Form");
      }

      if (regExp.test(this.state.email)) {
        axios
          .post("http://127.0.0.1:4000/users/email", {
            email: this.state.email
          })
          .then(res => {
            a(true, "Allowed Email address");
          })
          .catch(err => {
            a(false, "Already exists email!");
          });
      }
    });
  };

  handleInfoNext = () => {
    if ((this.state.password !== "") & (this.state.repassword !== "")) {
      if (this.state.password === this.state.repassword) {
        this.setState({ isRepwdValid: true });
      } else {
        this.setState({ isRepwdValid: false, isInfoNext: false });
      }
    }
    if (
      (this.state.email !== "") &
      (this.state.password !== "") &
      (this.state.repassword !== "") &
      (this.state.isEmailValid &
        this.state.isPwdValid &
        this.state.isRepwdValid)
    ) {
      this.setState({ isInfoNext: true });
    } else {
      this.setState({ isInfoNext: false });
    }
  };

  handleSignupBtn = () => {
    if (this.state.isNameValid & (this.state.name !== "")) {
      this.setState({ isSignupNext: true });
    } else {
      this.setState({ isSignupNext: false });
    }
  };

  handleNameCheck = e => {
    const regExp = /^[A-Za-z0-9_.]{3,30}$/;

    const a = (bool, msg) => {
      this.setState({ isNameValid: bool }, () => {
        this.setState({ helpName: msg }, () => {
          this.handleSignupBtn();
        });
      });
    };

    const repeatChk = () => {
      axios
        .post("http://127.0.0.1:4000/users/name", { name: this.state.name })
        .then(res => {
          a(true, "Allowed name");
        })
        .catch(err => {
          a(false, "Already exists name");
        });
    };

    this.setState({ name: e.target.value }, () => {
      if (regExp.test(this.state.name)) {
        repeatChk();
      } else {
        if ((this.state.name !== "") & (this.state.name.length < 3)) {
          a(false, "Should be more then 3 words");
        } else if (this.state.name.length > 30) {
          a(false, "Should no greater than 30 words");
        } else if ((this.state.name !== "") & !regExp.test(this.state.name)) {
          a(false, "Only '_' or '.' special character allowed");
        } else if (this.state.name === "") {
          a(true, "Enter your name please");
        }
      }
    });
  };

  handleSignup = () => {
    const formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("name", this.state.name);
    formData.append("password", this.state.password);
    formData.append("status", this.state.status);
    formData.append("type", this.state.usertype);
    formData.append("img", this.state.profileImg);

    return axios
      .post("http://127.0.0.1:4000/signup", formData)
      .then(res => {
        alert("signup success!");
      })
      .catch(err => {
        alert("signup fail!: " + err);
      });
  };

  handleTypeSketcher = () => {
    this.setState({ usertype: "Sketcher" }, () => {
      this.handleInfo();
    });
  };

  handleTypeCreator = () => {
    this.setState({ usertype: "Creator" }, () => {
      this.handleInfo();
    });
  };

  handleInfo = () => {
    this.setState({
      infoOpen: !this.state.infoOpen
    });
  };

  handleProfile = () => {
    this.setState({
      infoOpen: !this.state.infoOpen,
      profileOpen: !this.state.profileOpen
    });
  };

  handleProfileImg = e => {
    this.setState({ profileImg: e.target.files[0] }, () => {
      if (this.state.profileImg) {
        this.setState({
          profileImgUrl: URL.createObjectURL(this.state.profileImg)
        });
      }
    });
  };

  handleEnterKey = e => {
    //TODO Need to add profile enter key case condition (after adding signup function)
    if (
      (e.charCode === 13) &
      (this.state.profileOpen === false) &
      (this.state.isEmailValid &
        this.state.isPwdValid &
        this.state.isRepwdValid)
    ) {
      this.handleProfile();
    } else if (
      (e.charCode === 13) &
      (this.state.profileOpen === true) &
      this.state.isNameValid
    ) {
      this.handleSignup();
    }
  };

  handleStatusCheck = e => {
    this.setState({ status: e.target.value }, () => {
      this.setState({ isStatusValid: this.state.status.length <= 100 });
    });
  };
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
