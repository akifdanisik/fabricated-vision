
// Replace the existing handleModuleRequest function with the corrected version
const handleModuleRequest = (userInput: string): Message => {
    const lowerCaseInput = userInput.toLowerCase();
    
    if (lowerCaseInput.includes('supplier') || lowerCaseInput.includes('vendor')) {
      return {
        id: Date.now().toString(),
        content: 'Here\'s the supplier information you requested.',
        sender: 'ai',
        timestamp: new Date(),
        moduleType: 'supplier',
        moduleData: {}
      };
    } else if (lowerCaseInput.includes('inventory') || lowerCaseInput.includes('stock')) {
      return {
        id: Date.now().toString(),
        content: 'Here\'s the inventory information you requested.',
        sender: 'ai',
        timestamp: new Date(),
        moduleType: 'inventory',
        moduleData: {}
      };
    }
    
    return {
      id: Date.now().toString(),
      content: 'I\'m not sure what information you\'re looking for. Could you be more specific?',
      sender: 'ai',
      timestamp: new Date()
    };
  };
