const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const customerModuleConstants = require("../constants");

module.exports = ({ customer_id,
	name,
	mobile,
	email,
	gender,
	dob,
	pan,
	aadhar,
	address,
	father_name,
	occupation,
	annual_income,
	fatca,
	pep,
	customer_type,
	trading_experience,
	subscription_plan,
	brokerage_plan,
	ddpi,
	dis_booklet,
	bsda,
	martial_status,
	ucc_id,
	rm_code,
	is_active,
	password,
	mpin,
	biometric,
	pwd_last_set_date,
	mpin_last_set_date,
	bank_account_details,
	dp_details,
	product_details 
}) => {

	if (sharedValidators.isRequired(customer_id)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE001
		)
	}

	if (sharedValidators.isRequired(name)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE002
		)
	}
	if (!sharedValidators.isValidName(name)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE003
		)
	}
	if (sharedValidators.isRequired(email)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE004
		)
	}
	if (!sharedValidators.isValidEmail(email)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE005
		)
	}

	if (sharedValidators.isRequired(mobile)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE006
		)
	}
	if (!sharedValidators.isvalidMobileNumber(mobile)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE007
		)
	}

	if (sharedValidators.isRequired(gender)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE008
		)
	}

	if (!customerModuleConstants.registration.GENDER.hasOwnProperty(gender)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE009
		)
	}

	if (sharedValidators.isRequired(dob)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE010
		)
	}

	if (!sharedValidators.isValidDate(dob)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE011
		)
	}

	if (sharedValidators.isRequired(pan)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE012
		)
	}
	if (!sharedValidators.isValidPan(pan)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE013
		)
	}
	if (sharedValidators.isRequired(aadhar)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE016
		)
	}

	if (sharedValidators.isInt(aadhar)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE017
		)
	}
	if (sharedValidators.isRequired(address)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE014
		)
	}

	if (!sharedValidators.isObject(address) || !customerModuleConstants.registration.ADDRESS_KEYS.every(key => key in address)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE015
		)
	}

	if (sharedValidators.isRequired(father_name)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE018
		)
	}
	if (!sharedValidators.isValidName(father_name)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE019
		)
	}
	
	if (sharedValidators.isRequired(occupation)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE021
		)
	}
	if (sharedValidators.isRequired(annual_income)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE022
		)
	}
	if (!sharedValidators.isInt(annual_income)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE023
		)
	}
	if (sharedValidators.isRequired(fatca)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE024
		)
	}
	if (!customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(fatca)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE025
		)
	}
	if (sharedValidators.isRequired(pep)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE026
		)
	}
	if (!customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(pep)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE027
		)
	}
	if (sharedValidators.isRequired(customer_type)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE028
		)
	}
	if (!customerModuleConstants.registration.TYPE.hasOwnProperty(customer_type)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE029
		)
	}
	if (sharedValidators.isRequired(trading_experience)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE030
		)
	}
	if (sharedValidators.isRequired(subscription_plan)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE031
		)
	}
	if (!customerModuleConstants.registration.SUBSCRIPTION_PLAN.hasOwnProperty(subscription_plan)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE032
		)
	}
	if (sharedValidators.isRequired(brokerage_plan)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE033
		)
	}
	if (!customerModuleConstants.registration.BROKERAGE_PLAN.hasOwnProperty(brokerage_plan)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE034
		)
	}
	if (sharedValidators.isRequired(ddpi)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE035
		)
	}
	if (!customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(ddpi)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE036
		)
	}
	if (sharedValidators.isRequired(dis_booklet)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE037
		)
	}
	if (!customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(dis_booklet)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE038
		)
	}
	if (sharedValidators.isRequired(bsda)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE039
		)
	}
	if (!customerModuleConstants.registration.YES_NO_FLAG.hasOwnProperty(bsda)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE040
		)
	}
	if (sharedValidators.isRequired(martial_status)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE041
		)
	}
	if (!customerModuleConstants.registration.MARITIAL_STATUS.hasOwnProperty(martial_status)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE042
		)
	}
	if (sharedValidators.isRequired(ucc_id)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE043
		)
	}
	if (sharedValidators.isRequired(rm_code)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE044
		)
	}
	if (sharedValidators.isRequired(is_active)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE060
		)
	}
	if (!customerModuleConstants.registration.IS_ACTIVE.hasOwnProperty(is_active)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE061
		)
	}
	if (sharedValidators.isRequired(password)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE045
		)
	}
	
	if (sharedValidators.isRequired(mpin)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE046
		)
	}
	if (sharedValidators.isRequired(biometric)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE048
		)
	}
	if (sharedValidators.isRequired(pwd_last_set_date)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE049
		)
	}
	if (sharedValidators.isRequired(mpin_last_set_date)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE050
		)
	}
	if (sharedValidators.isRequired(bank_account_details)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE051
		)
	}
	if (!sharedValidators.isArray(bank_account_details)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE070
		)
	}
	
	 // Check if key exists
	 bank_account_details.map((b) => {
		if(!customerModuleConstants.registration.BANK_DETAILS.every(key => key in b)){
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE052
			)
		}

		if (sharedValidators.isRequired(b.bank_name)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE053
			)
		}
		if (sharedValidators.isRequired(b.account_name)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE054
			)
		}
		if (sharedValidators.isRequired(b.account_number)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE055
			)
		}
		if (sharedValidators.isRequired(b.ifsc_code)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE056
			)
		}
		if (sharedValidators.isRequired(b.micr_code)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE057
			)
		}
		if (sharedValidators.isRequired(b.is_default)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE058
			)
		}
		if (!customerModuleConstants.registration.IS_ACTIVE.hasOwnProperty(b.is_default)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE059
			)
		}
  })
	
	if (sharedValidators.isRequired(dp_details)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE062
		)
	}
	if (!sharedValidators.isArray(dp_details)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE071
		)
	}
	 // Check if key exists
	 dp_details.map((d) => {
		if(!customerModuleConstants.registration.DP_DETAILS.every(key => key in d)){
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE063
			)
		}

		if (sharedValidators.isRequired(d.dp_id)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE064
			)
		}
		if (sharedValidators.isRequired(d.beneficiary_id)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE065
			)
		}
		// if (sharedValidators.isRequired(d.member_id)) {
		// 	sharedServices.error.throw(
		// 		customerModuleConstants.registration.errorMessages.CRE066
		// 	)
		// }
		if (sharedValidators.isRequired(d.is_default)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE058
			)
		}
		if (!customerModuleConstants.registration.IS_ACTIVE.hasOwnProperty(d.is_default)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE059
			)
		}
  })

	if (sharedValidators.isRequired(product_details)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE067
		)
	}
	if (!sharedValidators.isArray(product_details)) {
		sharedServices.error.throw(
			customerModuleConstants.registration.errorMessages.CRE072
		)
	}
	 // Check if key exists
	 product_details.map((p) => {
		if(!customerModuleConstants.registration.PRODUCT_DETAILS.every(key => key in p)){
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE068
			)
		}

		if (sharedValidators.isRequired(p.product_code)) {
			sharedServices.error.throw(
				customerModuleConstants.registration.errorMessages.CRE069
			)
		}
		
  })
	return {
	customer_id,
	name,
	mobile,
	email,
	gender,
	dob,
	pan,
	aadhar,
	address,
	father_name,
	occupation,
	annual_income,
	fatca,
	pep,
	customer_type,
	trading_experience,
	subscription_plan,
	brokerage_plan,
	ddpi,
	dis_booklet,
	bsda,
	martial_status,
	ucc_id,
	rm_code,
	is_active,
	password,
	mpin,
	biometric,
	pwd_last_set_date,
	mpin_last_set_date,
	bank_account_details,
	dp_details,
	product_details
	};
};
