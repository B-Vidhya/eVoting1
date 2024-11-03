// Time period definitions


const Time = () => {
    const today = new Date();
    const nominationStartDate = new Date('2024-08-01'); // Replace with your dates
    const nominationEndDate = new Date('2024-08-15');
    const electionStartDate = new Date('2024-11-02');
    const electionEndDate = new Date('2024-11-25');
    const resultsDate = new Date('2024-12-07');
     
    if (today >= nominationStartDate && today <= nominationEndDate) {
      return 'nomination';
    } else if (today >= electionStartDate && today <= electionEndDate) {
      return 'election';
    } else if (today >= resultsDate) {
      return 'results';
    } else {
      return 'inactive';
    }
  };

  export default Time;
  