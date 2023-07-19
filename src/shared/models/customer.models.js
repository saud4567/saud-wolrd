const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const customerModels = {};

// @model-name: create
// @model-desc: create a new customer
customerModels.create = async (
  customerRefId,
	name,
	mobile,
	email,
	gender,
	dob,
	panNo,
	address,
	aadharNo,
	fatherName,
	occupation,
	annualIncome,
	fatca,
	pep,
	type,
	tradingExperience,
	subscrptionPlan,
	brokeragePlan,
	ddpi,
	disBooklet,
	bsda,
	martialStatus,
	uccId,
	rmCode,
	isActive
) => {
    const result = await new sharedServices.mysqlServices()
        .insert(
            sharedConstants.dbTableNames.customers,
            sharedServices.mysqlHelperServices.parseInsertValues({
							customer_ref_id:customerRefId,
							name,
							mobile,
							email,
							gender,
							dob,
							pan:panNo,
							address,
							aadharNo:aadharNo,
							father_name:fatherName,
							occupation,
							annual_income:annualIncome,
							fatca,
							pep,
							type,
							trading_experience:tradingExperience,
							subscrption_plan:subscrptionPlan,
							brokerage_plan:brokeragePlan,
							ddpi,
							dis_booklet:disBooklet,
							bsda,
							martial_status:martialStatus,
							ucc_id:uccId,
							rm_code:rmCode,
							is_active:isActive
            })
        )
        .build();

    return result;
};

// @model-name: read
// @model-desc: read customers based on filter
customerModels.read = async (whereParams) => {
    const where = [];

    if (whereParams.customerId) {
        where.push(`id='${whereParams.customerId}'`);
    }

    let result = new sharedServices.mysqlServices()
        .select(
            `
            id AS customerId,
            email
            `
        )
        .from(sharedConstants.dbTableNames.customers);

    if (where.length) {
        result = result.where(where.join(" AND "));
    }

    result = await result.build();

    return result;
};

// @model-name: update
// @model-desc: update customers based on update and where params
customerModels.update = async (updateParams, whereParams) => {
    const where = [];

    if (whereParams.customerId) {
        where.push(
            `id='${whereParams.customerId}'`
        );
    }
    if (whereParams.email) {
        where.push(
            `email='${whereParams.email}'`
        );
    }

    const result = await new sharedServices.mysqlServices()
        .update(
            sharedConstants.dbTableNames.customers,
            sharedServices.mysqlHelperServices.parseUpdateValues({
                name: updateParams.name,
                email: updateParams.email,
            })
        )
        .where(where.join(" AND "))
        .build();

    return result;
};

// @model-name: delete
// @model-desc: delete customer based on where params
customerModels.delete = async (whereParams) => {
    const where = [];

    if (whereParams.customerId) {
        where.push(
            `id='${whereParams.customerId}'`
        );
    }

    const result = await new sharedServices.mysqlServices()
        .delete(sharedConstants.dbTableNames.customers)
        .where(where.join(" AND "))
        .build();

    return result;
};

module.exports = customerModels;
