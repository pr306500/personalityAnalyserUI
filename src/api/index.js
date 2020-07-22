const fetchCompleteReport = async(info) => {
 
    try {
      let paragraph = {
        "description": info
      };
      const apiResponse = await fetch('http://localhost:3000/generateSpellReport', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paragraph)
      })
      const forumData = await apiResponse.json()
      return forumData;
    } catch (apiError) {
      console.log(apiError)
    }
  }

  module.exports = fetchCompleteReport;