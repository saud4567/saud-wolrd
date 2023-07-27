const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const customerModel = {};

// @model-name: create
// @model-desc: create a new customer
customerModel.create = async (
    customer_ref_id,
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
    type,
    trading_experience,
    subscription_plan,
    brokerage_plan,
    ddpi,
    dis_booklet,
    bsda,
    martial_status,
    ucc_id,
    rm_code,
    is_active
) => {
    const result = await new sharedServices.mysqlServices()
        .insert(
            sharedConstants.dbTableNames.customer,
            sharedServices.mysqlHelperServices.parseInsertValues({
                customer_ref_id,
                name,
                mobile,
                email,
                gender,
                dob,
                pan,
                address,
                aadhar,
                father_name,
                occupation,
                annual_income,
                fatca,
                pep,
                type,
                trading_experience,
                subscription_plan,
                brokerage_plan,
                ddpi,
                dis_booklet,
                bsda,
                martial_status,
                ucc_id,
                rm_code,
                is_active
            })
        )
        .build();

    return result;
};

// @model-name: read
// @model-desc: read customers based on filter
customerModel.read = async (whereParams) => {
    const where = [];

    if (whereParams.customerId) {
        where.push(`id='${whereParams.customerId}'`);
    }

    if (whereParams.emailORmobile &&
        whereParams.emailORmobile.email &&
        whereParams.emailORmobile.mobile
    ) {
        where.push(`(mobile='${whereParams.emailORmobile.mobile}' or email='${whereParams.emailORmobile.email}')`);
    }

    if (whereParams.username) {
        where.push(`(mobile='${whereParams.username}' or email='${whereParams.username}')`);
    }

    if (whereParams.customerRefId) {
        where.push(`customer_ref_id='${whereParams.customerRefId}'`);
    }

    let result = new sharedServices.mysqlServices()
        .select(
            `
            id as customerId,
            customer_ref_id as customerRefId,
            name,
            mobile,
            email,
            gender,
            dob,
            pan,
            address,
            aadhar,
            father_name as fatherName,
            occupation,
            annual_income as annualIncome,
            fatca,
            pep,
            type,
            trading_experience as tradingExperience,
            subscription_plan as subscriptionPlan,
            brokerage_plan as brokeragePlan,
            ddpi,
            dis_booklet as disBooklet,
            bsda,
            martial_status as martialStatus,
            ucc_id as uccId,
            rm_code as rmCode,
            is_active as isActive
            `
        )
        .from(sharedConstants.dbTableNames.customer);

    if (where.length) {
        result = result.where(where.join(" AND "));
    }

    result = await result.build();

    return result;
};

// @model-name: update
// @model-desc: update customers based on update and where params
customerModel.update = async (updateParams, whereParams) => {
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
            sharedConstants.dbTableNames.customer,
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
customerModel.delete = async (whereParams) => {
    const where = [];

    if (whereParams.customerId) {
        where.push(
            `id='${whereParams.customerId}'`
        );
    }

    const result = await new sharedServices.mysqlServices()
        .delete(sharedConstants.dbTableNames.customer)
        .where(where.join(" AND "))
        .build();

    return result;
};

module.exports = customerModel;
