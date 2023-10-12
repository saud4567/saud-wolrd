const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = (body) => {
  let errorListArray = [];
  if (sharedValidators.isRequired(body.name)) {
    errorListArray.push({
      name: customerModuleConstants.registration.errorMessages.CRE002.message,
    });
  }
  if (body.email && !sharedValidators.isValidName(body.name)) {
    errorListArray.push({
      name: customerModuleConstants.registration.errorMessages.CRE003.message,
    });
  }
  if (sharedValidators.isRequired(body.email)) {
    errorListArray.push({
      email: customerModuleConstants.registration.errorMessages.CRE004.message,
    });
  }

  if (body.email && !sharedValidators.isValidEmail(body.email)) {
    errorListArray.push({
      email: customerModuleConstants.registration.errorMessages.CRE005.message,
    });
  }

  if (sharedValidators.isRequired(body.mobile)) {
    errorListArray.push({
      mobile: customerModuleConstants.registration.errorMessages.CRE006.message,
    });
  }
  if (body.mobile && !sharedValidators.isvalidMobileNumber(body.mobile)) {
    errorListArray.push({
      mobile: customerModuleConstants.registration.errorMessages.CRE007.message,
    });
  }

  if (sharedValidators.isRequired(body.gender)) {
    errorListArray.push({
      gender: customerModuleConstants.registration.errorMessages.CRE008.message,
    });
  }

  if (
    body.gender &&
    !customerModuleConstants.registration.GENDER.hasOwnProperty(body.gender)
  ) {
    errorListArray.push({
      gender: customerModuleConstants.registration.errorMessages.CRE009.message,
    });
  }

  if (sharedValidators.isRequired(body.dob)) {
    errorListArray.push({
      DOB: customerModuleConstants.registration.errorMessages.CRE010.message,
    });
  }

  if (body.dob && !sharedValidators.isValidDate(body.dob)) {
    errorListArray.push({
      DOB: customerModuleConstants.registration.errorMessages.CRE011.message,
    });
  }

  if (sharedValidators.isRequired(body.subscription_plan)) {
    errorListArray.push({
      subscription_plan:
        customerModuleConstants.registration.errorMessages.CRE031.message,
    });
  }
  if (
    body.subscription_plan &&
    !customerModuleConstants.registration.SUBSCRIPTION_PLAN.hasOwnProperty(
      body.subscription_plan
    )
  ) {
    errorListArray.push({
      subscription_plan:
        customerModuleConstants.registration.errorMessages.CRE032.message,
    });
  }

  if (
    body.subscription_plan ==
    customerModuleConstants.registration.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    if (sharedValidators.isRequired(body.customer_ref_id)) {
      errorListArray.push({
        subscription_plan:
          customerModuleConstants.registration.errorMessages.CRE076.message,
      });
    }

    if (sharedValidators.isRequired(body.password)) {
      errorListArray.push({
        password:
          customerModuleConstants.registration.errorMessages.CRE045.message,
      });
    }
  }

  if (
    body.subscription_plan ==
      customerModuleConstants.registration.SUBSCRIPTION_PLAN.GOLD ||
    body.subscription_plan ==
      customerModuleConstants.registration.SUBSCRIPTION_PLAN.PLATINUM
  ) {
    if (sharedValidators.isRequired(body.pan)) {
      errorListArray.push({
        pan: customerModuleConstants.registration.errorMessages.CRE012.message,
      });
    }
    if (body.pan && !sharedValidators.isValidPan(body.pan)) {
      errorListArray.push({
        pan: customerModuleConstants.registration.errorMessages.CRE013.message,
      });
    }
    if (sharedValidators.isRequired(body.aadhar)) {
      errorListArray.push({
        aadhar:
          customerModuleConstants.registration.errorMessages.CRE016.message,
      });
    }

    if (body.aadhar && !sharedValidators.isValidAadhar(body.aadhar)) {
      errorListArray.push({
        aadhar:
          customerModuleConstants.registration.errorMessages.CRE017.message,
      });
    }

    if (sharedValidators.isRequired(body.bank_account_details)) {
      errorListArray.push({
        bank_account_details:
          customerModuleConstants.registration.errorMessages.CRE051.message,
      });
    }
    if (
      body.bank_account_details &&
      !sharedValidators.isArray(body.bank_account_details)
    ) {
      errorListArray.push({
        bank_account_details:
          customerModuleConstants.registration.errorMessages.CRE070.message,
      });
    }

    // Check if key exists
    if (body.bank_account_details) {
      body.bank_account_details.map((b) => {
        if (
          !customerModuleConstants.registration.BANK_DETAILS.every(
            (key) => key in b
          )
        ) {
          errorListArray.push({
            bank_account_details:
              customerModuleConstants.registration.errorMessages.CRE052.message,
          });
        }

        if (sharedValidators.isRequired(b.bank_name)) {
          errorListArray.push({
            bank_name:
              customerModuleConstants.registration.errorMessages.CRE053.message,
          });
        }
        if (sharedValidators.isRequired(b.account_name)) {
          errorListArray.push({
            account_name:
              customerModuleConstants.registration.errorMessages.CRE054.message,
          });
        }
        if (sharedValidators.isRequired(b.account_number)) {
          errorListArray.push({
            account_number:
              customerModuleConstants.registration.errorMessages.CRE055.message,
          });
        }
        if (sharedValidators.isRequired(b.ifsc_code)) {
          errorListArray.push({
            ifsc_code:
              customerModuleConstants.registration.errorMessages.CRE056.message,
          });
        }
        if (sharedValidators.isRequired(b.micr_code)) {
          errorListArray.push({
            micr_code:
              customerModuleConstants.registration.errorMessages.CRE057.message,
          });
        }
        if (sharedValidators.isRequired(b.is_default)) {
          errorListArray.push({
            bank_details_is_default:
              customerModuleConstants.registration.errorMessages.CRE058.message,
          });
        }
        if (
          b.is_default &&
          !customerModuleConstants.registration.IS_ACTIVE.hasOwnProperty(
            b.is_default
          )
        ) {
          errorListArray.push({
            bank_details_is_default:
              customerModuleConstants.registration.errorMessages.CRE059.message,
          });
        }
      });
    }

    if (sharedValidators.isRequired(body.dp_details)) {
      errorListArray.push({
        dp_details:
          customerModuleConstants.registration.errorMessages.CRE062.message,
      });
    }
    if (body.dp_details && !sharedValidators.isArray(body.dp_details)) {
      errorListArray.push({
        dp_details:
          customerModuleConstants.registration.errorMessages.CRE071.message,
      });
    }

    // Check if key exists
    if (body.dp_details) {
      body.dp_details.map((d) => {
        if (
          !customerModuleConstants.registration.DP_DETAILS.every(
            (key) => key in d
          )
        ) {
          errorListArray.push({
            dp_details:
              customerModuleConstants.registration.errorMessages.CRE063.message,
          });
        }
        if (sharedValidators.isRequired(d.dp_provider)) {
          errorListArray.push({
            dp_provider:
              customerModuleConstants.registration.errorMessages.CRE063.message,
          });
        }
        if (sharedValidators.isRequired(d.dp_id)) {
          errorListArray.push({
            dp_id:
              customerModuleConstants.registration.errorMessages.CRE064.message,
          });
        }
        if (sharedValidators.isRequired(d.beneficiary_id)) {
          errorListArray.push({
            beneficiary_id:
              customerModuleConstants.registration.errorMessages.CRE065.message,
          });
        }
        // if (sharedValidators.isRequired(d.member_id)) {
        // 	sharedServices.error.throw(
        // 		customerModuleConstants.registration.errorMessages.CRE066
        // 	)
        // }
        if (sharedValidators.isRequired(d.is_default)) {
          errorListArray.push({
            dp_details_is_default:
              customerModuleConstants.registration.errorMessages.CRE058.message,
          });
        }
        if (
          !customerModuleConstants.registration.IS_ACTIVE.hasOwnProperty(
            d.is_default
          )
        ) {
          errorListArray.push({
            dp_details_is_default:
              customerModuleConstants.registration.errorMessages.CRE059.message,
          });
        }
      });
    }
  }

  if (sharedValidators.isRequired(body.address)) {
    errorListArray.push({
      address:
        customerModuleConstants.registration.errorMessages.CRE014.message,
    });
  }

  if (
    body.address &&
    (!sharedValidators.isObject(body.address) ||
      !customerModuleConstants.registration.ADDRESS_KEYS.every(
        (key) => key in body.address
      ))
  ) {
    errorListArray.push({
      address:
        customerModuleConstants.registration.errorMessages.CRE015.message,
    });
  }

  if (body.address) {
    if (sharedValidators.isRequired(body.address.address_line_1)) {
      errorListArray.push({
        address_line_1:
          customerModuleConstants.registration.errorMessages.CRE079.message,
      });
    }

    if (sharedValidators.isRequired(body.address.city)) {
      errorListArray.push({
        city: customerModuleConstants.registration.errorMessages.CRE080.message,
      });
    }

    if (sharedValidators.isRequired(body.address.country)) {
      errorListArray.push({
        country:
          customerModuleConstants.registration.errorMessages.CRE081.message,
      });
    }

    if (sharedValidators.isRequired(body.address.pin_code)) {
      errorListArray.push({
        pin_code:
          customerModuleConstants.registration.errorMessages.CRE082.message,
      });
    }

    if (sharedValidators.isRequired(body.address.state)) {
      errorListArray.push({
        state:
          customerModuleConstants.registration.errorMessages.CRE083.message,
      });
    }
  }

  if (sharedValidators.isRequired(body.father_name)) {
    errorListArray.push({
      father_name:
        customerModuleConstants.registration.errorMessages.CRE018.message,
    });
  }
  if (body.father_name && !sharedValidators.isValidName(body.father_name)) {
    errorListArray.push({
      father_name:
        customerModuleConstants.registration.errorMessages.CRE019.message,
    });
  }

  if (sharedValidators.isRequired(body.occupation)) {
    errorListArray.push({
      occupation:
        customerModuleConstants.registration.errorMessages.CRE021.message,
    });
  }
  if (sharedValidators.isRequired(body.annual_income)) {
    errorListArray.push({
      annual_income:
        customerModuleConstants.registration.errorMessages.CRE022.message,
    });
  }
  if (!sharedValidators.isFloat(body.annual_income)) {
    errorListArray.push({
      annual_income:
        customerModuleConstants.registration.errorMessages.CRE023.message,
    });
  }
  if (sharedValidators.isRequired(body.fatca)) {
    errorListArray.push({
      fatca: customerModuleConstants.registration.errorMessages.CRE024.message,
    });
  }
  if (
    body.fatca &&
    !customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(body.fatca)
  ) {
    errorListArray.push({
      fatca: customerModuleConstants.registration.errorMessages.CRE025.message,
    });
  }
  if (sharedValidators.isRequired(body.pep)) {
    errorListArray.push({
      pep: customerModuleConstants.registration.errorMessages.CRE026.message,
    });
  }
  if (
    body.pep &&
    !customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(body.pep)
  ) {
    errorListArray.push({
      pep: customerModuleConstants.registration.errorMessages.CRE027.message,
    });
  }
  if (sharedValidators.isRequired(body.customer_type)) {
    errorListArray.push({
      customer_type:
        customerModuleConstants.registration.errorMessages.CRE028.message,
    });
  }
  if (
    body.customer_type &&
    !customerModuleConstants.registration.TYPE.hasOwnProperty(
      body.customer_type
    )
  ) {
    errorListArray.push({
      customer_type:
        customerModuleConstants.registration.errorMessages.CRE029.message,
    });
  }
  if (sharedValidators.isRequired(body.trading_experience)) {
    errorListArray.push({
      trading_experience:
        customerModuleConstants.registration.errorMessages.CRE030.message,
    });
  }
  if (!sharedValidators.isFloat(body.trading_experience)) {
    errorListArray.push({
      annual_income:
        customerModuleConstants.registration.errorMessages.CRE075.message,
    });
  }
  if (sharedValidators.isRequired(body.brokerage_plan)) {
    errorListArray.push({
      brokerage_plan:
        customerModuleConstants.registration.errorMessages.CRE033.message,
    });
  }
  if (
    body.brokerage_plan &&
    !customerModuleConstants.registration.BROKERAGE_PLAN.hasOwnProperty(
      body.brokerage_plan
    )
  ) {
    errorListArray.push({
      brokerage_plan:
        customerModuleConstants.registration.errorMessages.CRE034.message,
    });
  }
  if (sharedValidators.isRequired(body.ddpi)) {
    errorListArray.push({
      ddpi: customerModuleConstants.registration.errorMessages.CRE035.message,
    });
  }
  if (
    body.ddpi &&
    !customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(body.ddpi)
  ) {
    errorListArray.push({
      ddpi: customerModuleConstants.registration.errorMessages.CRE036.message,
    });
  }
  if (sharedValidators.isRequired(body.dis_booklet)) {
    errorListArray.push({
      dis_booklet:
        customerModuleConstants.registration.errorMessages.CRE037.message,
    });
  }
  if (
    body.dis_booklet &&
    !customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(
      body.dis_booklet
    )
  ) {
    errorListArray.push({
      dis_booklet:
        customerModuleConstants.registration.errorMessages.CRE038.message,
    });
  }
  if (sharedValidators.isRequired(body.bsda)) {
    errorListArray.push({
      bsda: customerModuleConstants.registration.errorMessages.CRE039.message,
    });
  }
  if (
    body.bsda &&
    !customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(body.bsda)
  ) {
    errorListArray.push({
      bsda: customerModuleConstants.registration.errorMessages.CRE040.message,
    });
  }
  if (sharedValidators.isRequired(body.marital_status)) {
    errorListArray.push({
      marital_status:
        customerModuleConstants.registration.errorMessages.CRE041.message,
    });
  }
  if (
    body.marital_status &&
    !customerModuleConstants.registration.MARITIAL_STATUS.hasOwnProperty(
      body.marital_status
    )
  ) {
    errorListArray.push({
      marital_status:
        customerModuleConstants.registration.errorMessages.CRE042.message,
    });
  }
  if (sharedValidators.isRequired(body.ucc_id)) {
    errorListArray.push({
      ucc_id: customerModuleConstants.registration.errorMessages.CRE043.message,
    });
  }
  if (sharedValidators.isRequired(body.rm_code)) {
    errorListArray.push({
      rm_code:
        customerModuleConstants.registration.errorMessages.CRE044.message,
    });
  }
  if (sharedValidators.isRequired(body.is_active)) {
    errorListArray.push({
      is_active:
        customerModuleConstants.registration.errorMessages.CRE060.message,
    });
  }
  if (
    body.is_active &&
    !customerModuleConstants.registration.IS_ACTIVE.hasOwnProperty(
      body.is_active
    )
  ) {
    errorListArray.push({
      is_active:
        customerModuleConstants.registration.errorMessages.CRE061.message,
    });
  }

  // if (sharedValidators.isRequired(body.mpin)) {
  //   errorListArray.push({
  //     mpin: customerModuleConstants.registration.errorMessages.CRE046.message,
  //   });
  // }
  // if (sharedValidators.isRequired(body.biometric)) {
  //   errorListArray.push({
  //     biometric:
  //       customerModuleConstants.registration.errorMessages.CRE048.message,
  //   });
  // }

  if (sharedValidators.isRequired(body.product_details)) {
    errorListArray.push({
      product_details:
        customerModuleConstants.registration.errorMessages.CRE067.message,
    });
  }
  if (body.product_details && !sharedValidators.isArray(body.product_details)) {
    errorListArray.push({
      product_details:
        customerModuleConstants.registration.errorMessages.CRE072.message,
    });
  }
  // Check if key exists
  if (body.product_details) {
    body.product_details.map((p) => {
      if (
        !customerModuleConstants.registration.PRODUCT_DETAILS.every(
          (key) => key in p
        )
      ) {
        errorListArray.push({
          product_details:
            customerModuleConstants.registration.errorMessages.CRE068.message,
        });
      }

      if (sharedValidators.isRequired(p.product_code)) {
        errorListArray.push({
          product_code:
            customerModuleConstants.registration.errorMessages.CRE069.message,
        });
      }
    });
  }

  if (errorListArray.length) {
    let errorObj = {
      statusCode: 400,
      message: errorListArray,
    };

    sharedServices.error.throw(errorObj);
  }

  return { body };
};
