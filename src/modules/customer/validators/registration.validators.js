const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = (body) => {

	let errorListArray = [];
	if (sharedValidators.isRequired(body.name)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE002
		);
	}
	if (!sharedValidators.isValidName(body.name)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE003
		);
	}
	if (sharedValidators.isRequired(body.email)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE004
		);
	}

	if (!sharedValidators.isValidEmail(body.email)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE005
		)
	}

	if (sharedValidators.isRequired(body.mobile)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE006
		)
	}
	if (!sharedValidators.isvalidMobileNumber(body.mobile)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE007
		)
	}

	if (sharedValidators.isRequired(body.gender)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE008
		)
	}

	if (!customerModuleConstants.registration.GENDER.hasOwnProperty(body.gender)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE009
		)
	}

	if (sharedValidators.isRequired(body.dob)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE010
		)
	}

	if (!sharedValidators.isValidDate(body.dob)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE011
		)
	}

	if (sharedValidators.isRequired(body.pan)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE012
		)
	}
	if (!sharedValidators.isValidPan(body.pan)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE013
		)
	}
	if (sharedValidators.isRequired(body.aadhar)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE016
		)
	}

	if (sharedValidators.isInt(body.aadhar)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE017
		)
	}
	if (sharedValidators.isRequired(body.address)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE014
		)
	}

	if (!sharedValidators.isObject(body.address) || !customerModuleConstants.registration.ADDRESS_KEYS.every(key => key in body.address)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE015
		)
	}

	if (sharedValidators.isRequired(body.father_name)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE018
		)
	}
	if (!sharedValidators.isValidName(body.father_name)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE019
		)
	}

	if (sharedValidators.isRequired(body.occupation)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE021
		)
	}
	if (sharedValidators.isRequired(body.annual_income)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE022
		)
	}
	if (!sharedValidators.isInt(body.annual_income)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE023
		)
	}
	if (sharedValidators.isRequired(body.fatca)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE024
		)
	}
	if (!customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(body.fatca)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE025
		)
	}
	if (sharedValidators.isRequired(body.pep)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE026
		)
	}
	if (!customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(body.pep)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE027
		)
	}
	if (sharedValidators.isRequired(body.customer_type)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE028
		)
	}
	if (!customerModuleConstants.registration.TYPE.hasOwnProperty(body.customer_type)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE029
		)
	}
	if (sharedValidators.isRequired(body.trading_experience)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE030
		)
	}
	if (sharedValidators.isRequired(body.subscription_plan)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE031
		)
	}
	if (!customerModuleConstants.registration.SUBSCRIPTION_PLAN.hasOwnProperty(body.subscription_plan)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE032
		)
	}
	if (sharedValidators.isRequired(body.brokerage_plan)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE033
		)
	}
	if (!customerModuleConstants.registration.BROKERAGE_PLAN.hasOwnProperty(body.brokerage_plan)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE034
		)
	}
	if (sharedValidators.isRequired(body.ddpi)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE035
		)
	}
	if (!customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(body.ddpi)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE036
		)
	}
	if (sharedValidators.isRequired(body.dis_booklet)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE037
		)
	}
	if (!customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(body.dis_booklet)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE038
		)
	}
	if (sharedValidators.isRequired(body.bsda)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE039
		)
	}
	if (!customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(body.bsda)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE040
		)
	}
	if (sharedValidators.isRequired(body.martial_status)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE041
		)
	}
	if (!customerModuleConstants.registration.MARITIAL_STATUS.hasOwnProperty(body.martial_status)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE042
		)
	}
	if (sharedValidators.isRequired(body.ucc_id)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE043
		)
	}
	if (sharedValidators.isRequired(body.rm_code)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE044
		)
	}
	if (sharedValidators.isRequired(body.is_active)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE060
		)
	}
	if (!customerModuleConstants.registration.IS_ACTIVE.hasOwnProperty(body.is_active)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE061
		)
	}
	if (sharedValidators.isRequired(body.password)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE045
		)
	}

	if (sharedValidators.isRequired(body.mpin)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE046
		)
	}
	if (sharedValidators.isRequired(body.biometric)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE048
		)
	}
	if (sharedValidators.isRequired(body.bank_account_details)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE051
		)
	}
	if (!sharedValidators.isArray(body.bank_account_details)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE070
		)
	}

	// Check if key exists
	body.bank_account_details.map((b) => {
		if (!customerModuleConstants.registration.BANK_DETAILS.every(key => key in b)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE052
			)
		}

		if (sharedValidators.isRequired(b.bank_name)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE053
			)
		}
		if (sharedValidators.isRequired(b.account_name)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE054
			)
		}
		if (sharedValidators.isRequired(b.account_number)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE055
			)
		}
		if (sharedValidators.isRequired(b.ifsc_code)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE056
			)
		}
		if (sharedValidators.isRequired(b.micr_code)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE057
			)
		}
		if (sharedValidators.isRequired(b.is_default)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE058
			)
		}
		if (!customerModuleConstants.registration.IS_ACTIVE.hasOwnProperty(b.is_default)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE059
			)
		}
	})

	if (sharedValidators.isRequired(body.dp_details)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE062
		)
	}
	if (!sharedValidators.isArray(body.dp_details)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE071
		)
	}
	// Check if key exists
	body.dp_details.map((d) => {
		if (!customerModuleConstants.registration.DP_DETAILS.every(key => key in d)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE063
			)
		}

		if (sharedValidators.isRequired(d.dp_id)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE064
			)
		}
		if (sharedValidators.isRequired(d.beneficiary_id)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE065
			)
		}
		// if (sharedValidators.isRequired(d.member_id)) {
		// 	sharedServices.error.throw(
		// 		customerModuleConstants.registration.errorMessages.CRE066
		// 	)
		// }
		if (sharedValidators.isRequired(d.is_default)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE058
			)
		}
		if (!customerModuleConstants.registration.IS_ACTIVE.hasOwnProperty(d.is_default)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE059
			)
		}
	})

	if (sharedValidators.isRequired(body.product_details)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE067
		)
	}
	if (!sharedValidators.isArray(body.product_details)) {
		errorListArray.push(
			customerModuleConstants.registration.errorMessages.CRE072
		)
	}
	// Check if key exists
	body.product_details.map((p) => {
		if (!customerModuleConstants.registration.PRODUCT_DETAILS.every(key => key in p)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE068
			)
		}

		if (sharedValidators.isRequired(p.product_code)) {
			errorListArray.push(
				customerModuleConstants.registration.errorMessages.CRE069
			)
		}

	});

	if (errorListArray.length) {
		return errorListArray;
	}

	return { body };
};
