let pageObjects = {}
module.exports = {
    beforeEach: browser => {
        pageObjects = browser.page.pageObjects()
        pageObjects.navigate()
    },
    after: browser => {
        browser.end()
    },

    'Evens and Odds': browser => {
        pageObjects
            .setValue('@evenOddInput', "2,3,7,42,0,15")
            .click('@evenOddButton')
            .expect.element('@evenResults').text.to.contain('2', '42', '0')
        pageObjects
            .expect.element('@evenResults').text.to.not.contain('3', '7', '15')
        pageObjects
            .expect.element('@oddResults').text.to.contain('3', '7', '15')
        pageObjects
            .expect.element('@oddResults').text.to.not.contain('2', '42', '0')
    },
    'Filter Object': browser => {
        pageObjects
            .setValue('@objectFilterInput', "hairColor")
            .click('@objectFilterButton')
            .expect.element('@objectFilterResults').text.to.contain('{ "name": "Jeremy Schrader", "age": 24, "hairColor": "brown" }')
        pageObjects
            .expect.element('@objectFilterResults').text.to.not.equal('Filtered: [ { "name": "Jimmy Joe", "title": "Hack0r", "age": 12 }, { "name": "Carly Armstrong", "title": "CEO" } ]')
        },
    'Filter String': browser => {
        pageObjects
            .setValue('@nameFilterInput', "Je")
            .click('@nameFilterButton')
            .expect.element('@nameFilterResults').text.to.contain('"Jessica", "Jennifer"')
        pageObjects
            .expect.element('@nameFilterResults').text.to.not.contain('"James", "Melody", "Tyler", "Blake", "Mark", "Maddy"')
    },
    'Palindrome': browser => {
        pageObjects
            .setValue('@palindromeInput', "gohangasalamiimalasagnahog")
            .click('@palindromeButton')
            .expect.element('@palindromeResults').text.to.equal('Palindrome: true')
        pageObjects
            .expect.element('@palindromeResults').text.to.not.contain('false')
    },
    'Sum': browser => {
        pageObjects
            .setValue('@sumInput1', "15")
            .setValue('@sumInput2', "16")
            .click('@sumButton')
            .expect.element('@sumResults').text.to.equal("Sum: 31")
    }
}