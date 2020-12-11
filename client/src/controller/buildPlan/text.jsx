import _ from "lodash";
import { clean, efficientIncome } from "controller/buildPlan/helpers";
import { dummyStream } from "data";

import * as u from "model/utils";
import { store } from "index";
import { set } from "model/redux/actions/actions";

export const addQuestionsText = (textKey, user, n) => {
  const { stream_reducer, user_reducer, ui_reducer, calc_reducer } = store.getState();
  const { selectedId, isMarried, hasChildren } = ui_reducer;
  const { rate1, mer, inflationRate } = user_reducer;
  const stream = stream_reducer[selectedId] || dummyStream;
  const isUser1 = user === "user1";
  const { reg } = stream;
  const { firstName: spouseFirstName } = user_reducer.user2;
  const { firstName, birthYear, cppStartAge, oasStartAge } = user_reducer[user];
  const { avgIncome: user1AvgInc } = calc_reducer.user1;
  const { avgIncome: user2AvgInc } = calc_reducer.user2;
  const { user2, retIncome } = user_reducer;

  const data = {
    addAnotherIncome: {
      explanation:
        "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
      option1: "yes",
      option2: "no",
      question: "Would you like to add another income source?",
    },
    assumptionsPanel: {
      subTitle:
        "Since the assumptions change everything you might want to change them at different points when you’re building the plan. Just click on the tab to open the tool box.",
      question: "We’ve added a tool box to enable you to change the assumptions anywhere in your plan. ",
    },
    birthYear: {
      explanation: "This forms the basis of our financial calculations.",
      label: "Birth Year",
      placeholder: "YYYY",
      question: isUser1 ? "What's your birth year?" : "What's your spouse's birth year?",
    },
    combinedIncomeChart: {
      subTitle: "This will form the basis for the next steps in building your plan.",
      explanation:
        "Our goal is to see what your government benefits in retirement looks like. If you're earning too much you can have these 'clawed back' through high taxes. By estimating your pension now we build a savings plan that saves you the most in taxes when you retire.",
      question: "This shows your income combined",
    },
    cppStartAge: {
      subTitle: isUser1 ? "This shows how much CPP you could receive each year." : "bye",
      explanation: isUser1
        ? "The earlier you take Canada Pension Plan the less you will receive. This chart shows how much more you could receive each year if you wait. These values are before tax and are estimated using the income details you provided."
        : "If theres a large difference between what you are both recieveing that will play into our tax saving strategy.",
      question: `When would ${isMarried ? firstName : "you"} like to begin taking Canada Pension Plan?`,
      bottomLabel: `in ${+cppStartAge + +birthYear}`,
      topLabel: "I'd like to start at age ",
    },
    createIncome: {
      explanation: "",
      subTitle: "We'll use this to build a chart showings your income streams and estimate your pension income.",
      question: `We need details about ${isMarried && !isUser1 ? spouseFirstName + "'s" : "your"} income`,
      label: "lets go",
    },
    createSavings: {
      optionArray: [
        {
          label: "tax free savings account",
          reg: "TFSA",
          info:
            "The TFSa enables you to  avoid taxes on the gains you make. If you invest $100 right now and it becomes $1000 by the time you retire, that $900 you'll have earned is tax-free. You can also take money out any time you want. There is no penalty to withdraw - and if you do, the amount is added to how much you can contribute the following year.",
        },
        {
          label: "registered retirement savings",
          reg: "RRSP",
          info:
            "A popular retirement account designed to help Canadians save for retirement. The money you contribute to your RRSP is “pre-tax.” That means that you can subtract the amount you contribute from your income and pay less in income taxes. If you made $60,000 and you contributed $5,000 to your RRSP, you will pay tax on only $55,000 of income.",
        },
        {
          label: "personal",
          reg: "Personal",
          info:
            "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
        },
        {
          label: "Locked in Retirement Account",
          reg: "LIRA",
          info:
            "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
        },
        {
          label: "Pension",
          reg: "Pension",
          info:
            "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
        },
        {
          label: "RESP",
          reg: "RESP",
          info:
            "A popular savings account for parents or family members to save money for their children's education. With an RESP, the government will match your contributes and anything you earn through investing is earned tax-free. As always, there are rules and limitations.",
        },
        { label: "none", reg: "none" },
      ],
      question: isMarried ? `Does ${_.startCase(firstName)} have investments?` : "Do you have investments?",
    },
    oasStartAge: {
      explanation: isUser1
        ? "The earlier you take Canada Pension Plan the less you will receive. This chart shows how much more you could receive each year if you wait. These values are before tax and are estimated using the income details you provided."
        : "If theres a large difference between what you are both recieveing that will play into our tax saving strategy.",
      question: `When would ${isMarried ? firstName : "you"} like to begin collecting Old Age Security?`,
      bottomLabel: `in ${+oasStartAge + +birthYear}`,
      topLabel: "I'd like to start at age ",
    },
    retIncome: {
      ask: "Just an approximation of the current value is helpful. ",
      bottomLabel: `$${u.asCurrency(retIncome / 12).toLocaleString()} a month`,
      subTitle: `The rule of thumb is 70% of your average income, so in your case that would be $${u.asCurrency(
        (user1AvgInc + user2AvgInc) * 0.7
      )}.`,
      topLabel: "I'd love to earn ",
      question: `How much ${isMarried ? "combined" : ""} after tax income would you like to target in retirement?`,
      explanation: "Knowing this we can build reccomendations on how you should be saving now",
    },
    targetIncomeChart: {
      question: "We calculated the most efficient way for you to draw your retirement income and placed it in the chart below",
      subTitle: efficientIncome(),
      explanation: efficientIncome(),
    },
    targetNestEgg: {
      question: "The most efficient way for you to retire and pay the least amount of taxes would be for your savings to look like this.",
      explanation:
        'We\'ll call the amount of savings you have upon entering retirement your "Nest Egg". Our next task is to build the savings plan that will ',
    },

    gender: {
      component: "PickSingleOption", //this component allows the user to choose one of a number of options
      optionArray: ["male", "female", "prefer not to say", "write below"],
      explanation: "We want to ensure our planning process is inclusive.",
      question: isUser1 ? "What's your gender?" : "What's your sspouse's gender?",
    },
    haveChildren: {
      explanation:
        "We'd like to estimate your government child benefits. Even if you only plan on having children its helpful to know so we can show you how it will impact your finances.",
      optionArray: ["yes", "no", "hope to eventually", "yes, and they are over 18"],
      question: "Do you have children?",
    },
    incomeParagraph: {
      question: "Heres the deal...",
      text:
        "Given the income you entered we estimate your Canada Pension Plan payment, in todays dollars, to be around $14k per year if you take it at 65 along with $7k in Old Age Pension. The lowest income tax bracket is $42 k, so our strategy is to figure out how much you need to invest in your RRSP’s to be drawing income that will keep you in the lowest bracket in retirement. ",
    },
    lifeSpan: {
      explanation: isUser1
        ? "Many of our calculations are trying to estimate how long your money needs to last for when drawing income in retirement. The longer you live the more you will need to have saved."
        : "",
      subTitle: isUser1 ? "This is called a survival chart and shows the probability of living to a given age.  " : "",
      label: "First Name",
      question: `We you like to adjust ${isMarried && !isUser1 ? spouseFirstName + "'s" : "your"} life span?`,
      topLabel: "I hope to live until ",
      bottomLabel: "years old ",
    },
    name: {
      explanation: "This helps us personalize your plan.",
      label: "First Name",
      question: isUser1 ? "What's your first name?" : "What's your spouse's first name?",
    },
    numberOfChildren: {
      explanation: hasChildren
        ? "We'd like to estimate your government child benefits."
        : "Just guessing is fine, it will give you an idea of the impact of government benefits on your plan. You can always adjust it later. ",
      question: "How many children?",
    },
    managementExpenseRatio: {
      subTitle: `Your management fee is paid to the firm managing your investments and varies from 0.5% to 3%. For our calculations we use 1.2%. Like inflation, this fee is deducted from your return to get your real rate of return. Your ${rate1}% return minus ${inflationRate}% inflation and ${mer}% in fees will then be ${(
        rate1 -
        inflationRate -
        mer
      ).toFixed(2)}%`,
      question: "Would you like to adjust your investment management fee?",
      bottomLabel: ``,
      topLabel: "My fee is ",
    },
    inflationRate: {
      subTitle: `When we show you values like income, or savings, far in the future we'd like them to be in todays dollars so their easier to understand. A simple trick to remove inflation from our calculations is to deduct it from your rate of retun. So if ${inflationRate}% is the inflation rate we then use ${(
        rate1 - inflationRate
      ).toFixed(2)}% as our return on investment`,
      question: "Would you like to adjust the estimated inflation rate?",
      bottomLabel: `We use 2%`,
      topLabel: "Inflation might be ",
    },
    introduction: {
      subTitle: "This chart compares the average Canadian who has a plan with someone who doesn't.  ",
      question: "Why should you have a financial plan? ",
    },
    idealIncome: {
      question: "banana",
      explanation: "banana",
      num: 3,
      slider1: {
        bottomLabel: `at age 12`, //eg "at age 26"
        max: 2080,
        min: 18, //if its the first one then just 2020, otherwise its the period priors last year
        step: 1,
        topLabel: "then in", //for the first one we want to say "starting in" but after they add changes we want it to say "then in"
        type: "year",
        value: user_reducer["idealIncome"],
        handleChange: (value) => {
          set("user_reducer", { idealIncome: value });
        },
      },
      slider2: {
        bottomLabel: `at age 12`,
        max: 250000,
        min: 0,
        step: 1000,
        topLabel: `at age 12`,
        value: 0,
        handleChange: (value) => set("user_reducer", { idealIncome: value }),
      },
    },
    incomeAmount: {
      question:
        isUser1 && n === 0
          ? "This chart shows your estimated income for each year."
          : isUser1 && n === 1
          ? "The more income streams you add the more accurate our estimates can be."
          : n === 2
          ? "Give us an estimate of this income stream"
          : n === 0
          ? `Adding ${user2["firstName"]}'s income helps us identify areas where you might be able to save on taxes.`
          : "banana",
      explanation:
        isUser1 && n === 0 && hasChildren
          ? "See how you already have income? We Calculated your Canada Child Benefit, before deductions, as well as estimated your old age securty. Its all in todays dollars. "
          : isUser1 && n === 0
          ? "See how you already have income? We estimated your old age security. Its all in todays dollars. "
          : isUser1 && n === 1
          ? "The more income streams you add the more accurate our estimates can be."
          : n === 2
          ? "Add this income to the chart"
          : null,
      topLabelPast: "I earned",
      topLabelFuture: "I hope to earn",
      bottomLabel: "before tax per year",
      explainer: "If you think your income might change you can add different earning periods, ignore inflation.",
      subTitle:
        isUser1 && n === 0
          ? `We'll use your estimates to calculate what your Canada Pension Plan and Old Age Security income might be.`
          : null,
    },
    incomeName: {
      explanation:
        'Examples could be if you work as an Engineer, you could say "Engineering". Or name if after the employer that pays you, like "Wal Mart".',
      label: "Source of Income",
      placeholder: "Income Name",
      question:
        isUser1 && n === 0
          ? "We'll start by adding your most prominant source of income. Where does it come from?"
          : "Where does this income come from?",
    },
    incomeRegistration: {
      explanation:
        "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
      optionArray: ["Regular Employment", "Business Income", "Investment Income", "Rental Income"],
      question: "What kind of income is it?",
    },
    isMarried: {
      explanation: "Having a spouse has a large impact on your plan",
      optionArray: ["single", "married", "common-law"],
      question: "Are you married?",
    },
    rate1: {
      explanation: "This assumption is very important as we try to estimate how much you need to save until retirement.",
      subTitle:
        "Usually anything above 6% is considered higher risk.  There's no way of knowing what you'll actually get so its best to play it safe when planning but not so safe that your savings goals aren't realistic. ",
      question: "Would you like to adjust your pre-retirement rate of return?",
      bottomLabel: `We use 6%,`,
      topLabel: "I hope to get ",
    },
    rate2: {
      explanation: "We use this interest rate to calculate how much income you can draw from your investments in retirement.",
      subTitle: "Its helpful to assume that you'll want to take on less risk in retirement leading to a lower return. ",
      question: "Would you like to adjust your lower risk rate of return for after you've retired?",
      bottomLabel: `We use 4.5%`,
      topLabel: "I hope to get",
    },
    retirementAssumptionsPanel: {
      subTitle:
        "Since the assumptions change everything you might want to change them at different points when you’re building the plan. Just click on the tab to open the tool box.",
      question: "We’ve added a tab to your tool box to enable you to change the retirement assumptions anywhere in your plan. ",
    },
    rrspStartAge: {
      subTitle:
        "The latest you’re allowed to convert is age 72. We usually keep it simple and use 65 but this is where strategy comes into play regarding how you can save on taxes.  ",
      explanation:
        "This is called converting it to a RRIF, Registered Retirement Investment Fund. Once it’s converted you have to make a minimum withdrawal of at least 4% each year. ",
      question: "When would you like to begin drawing income from your Registered Retirement Savings account?",
      bottomLabel: `Return on Investment`,
      topLabel: "I'd like to convert in ",
    },
    savingsCurrentValue: {
      ask: "Just an approximation of the current value is helpful. ",
      bottomLabel: `in my ${reg.toUpperCase()}`,
      topLabel: "I have around ",
      question: `How much do you currently have in your ${clean(reg)}?`,
      explanation: "We'll calculate its future value so we can determine your retirement income.",
    },
    savingsContributions: {
      question: `This chart shows your ${clean(reg)} as it grows with contributions and without making any withdrawals. `,
      subTitle: `How much do you plan to contribute each year to your ${reg}?`,
      explanation:
        n === 0
          ? "Our goal is to estimate how much you could withdraw in retirement. Knowing that helps us make decisions like when to retire or how much to save. "
          : "BANANANAN",
      topLabelPast: "I contributed",
      topLabelFuture: "I plan to contribute",
      bottomLabel: "per year",
    },
    savingsRates: {
      question: `This chart shows how your ${reg} grows as you save and then shrinks as you draw income in retirement.`,
      subTitle: `How much do you plan to contribute each year to your ${reg}?`,
      explanation:
        n === 0
          ? "Our goal is to estimate how much you could withdraw in retirement. Knowing that helps us make decisions like when to retire or how much to save. "
          : "BANANANAN",
      topLabelPast: "I think I'll earn",
      topLabelFuture: "I plan to contribute",
      bottomLabel: "per year",
    },
    savingsWithdrawals: {
      question: "Now we add withdrawals, we'll add these withdrawals to your income. ",
      explanation: "Knowing your future income helps us determine your pension income",
      topLabelPast: "I earned",
      topLabelFuture: "I'd like to withdraw",
      bottomLabel: "before tax per year",
    },
    tfsaStartAge: {
      subTitle:
        "There are no rules about when you have to withdraw or how much. For our calculations we’d like to estimate how much you can withdraw each year and we need a starting year for our formula. ",
      question: "When would you like to begin drawing income from your TFSA and other investment savings?",
      bottomLabel: `Return on Investment`,
      topLabel: "I hope to get ",
    },
    theyWantToChangeRateAssumptions: {
      question: "Would you like to change the plans assumptions?",
      subTitle:
        "Since we don’t know the future we have a make a series of guesses about what could happen. We call these assumptions, they include interest and inflation rates along with several other factors. They have already been set but you're welcome to adjust them to your preferences.",
      explanation: "Some people enjoy digging into the details while others just want to skip to the results. ",
      option1: "yes",
      option2: "no",
    },
    theyWantToChangeRetirementAssumptions: {
      question: "Would you like to change assumptions we’ve made about when you might retire? ",
      subTitle:
        "We’ve assumed you’d like to start drawing from your investments, begin collecting Canada Pension Plan, and Old Age security at age 65. ",
      explanation: "Some people enjoy digging into the details while others just want to skip to the results. ",
      option1: "yes",
      option2: "no",
    },
    whatWeWillBuild: {
      question: "What will we build?",
      subTitle: `We want you to be able to answer one question: are you ok financially? To do this we will ask you for details about your current financial position. We will then estimate your government benefits and calculate the most tax efficient way for you to draw income in retirement. Then we can make reccomendations on what you need to do now to ensure you're making the best financial decisions. Finally we'll give you the ability to build different scenarios and see how things might play out.`,
    },
  };

  return data[textKey];
};
