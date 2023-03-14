// We have two different objects, periodDataAutumn and periodDataSpring. One of these two is called to use in OmaHoks.js
// depending if user chooses their studies starting period to be spring or autumn.
const periodDataAutumn = (aot, yot) => {
    return ( {
    aOpinnot: {
        orderNum: 0,
        name: "Tutkinnon osat",
        // First object uses argument 'aot', here we parse the 'ammatilliset tutkinnonosat' of the incoming JSON.data.
        items: aot
    },
    yOpinnot: {
      orderNum: 20,
      name: "Tutkinnon osat",
      // And to yot we parse the 'yhteisopinnot' portion of the JSON.data.
      items: yot
  },
    syksyI: {
      orderNum: 1,
      name: "Syksy I",
      // Rest of the objects have empty array, which is rendered as periods, and where the draggable studies from aot or yot can be dropped and spliced.
      items: [],
      
    },
    syksyII: {
      orderNum: 2,
      name: "Syksy II",
      items: []
    },
    kevätIII: {
      orderNum: 3,
      name: "Kevät III",
      items: []
    },
    kevätIV: {
      orderNum: 4,
      name: "Kevät IV",
      items: []
    },
    kesäV: {
      orderNum: 5,
      name: "Kesä V",
      items: []
    }
    ,
    syksyI2: {
      orderNum: 6,
      name: "Syksy I / II",
      items: [],
      
    },
    syksyII2: {
      orderNum: 7,
      name: "Syksy II / II",
      items: []
    },
    kevätIII2: {
      orderNum: 8,
      name: "Kevät III / II",
      items: []
    },
    kevätIV2: {
      orderNum: 9,
      name: "Kevät IV / II",
      items: []
    },
    kesäV2: {
      orderNum: 10,
      name: "Kesä V / II",
      items: []
    }
    ,
    syksyI3: {
      orderNum: 11,
      name: "Syksy I / III",
      items: [],
      
    },
    syksyII3: {
      orderNum: 12,
      name: "Syksy II / III",
      items: []
    },
    kevätIII3: {
      orderNum: 13,
      name: "Kevät III / III",
      items: []
    },
    kevätIV3: {
      orderNum: 14,
      name: "Kevät IV / III",
      items: []
    },
    kesäV3: {
      orderNum: 15,
      name: "Kesä V / III",
      items: []
    }
})
}

const periodDataSpring = (aot, yot) => {
  return ( {
    aOpinnot: {
      orderNum: 0,
      name: "Tutkinnon osat",
      items: aot
  },
  yOpinnot: {
    orderNum: 20,
    name: "Tutkinnon osat",
    items: yot
},
  kevatI: {
    orderNum: 1,
    name: "Kevät I",
    items: [],
    
  },
  kevatII: {
    orderNum: 2,
    name: "Kevät II",
    items: []
  },
  syksyIII: {
    orderNum: 3,
    name: "Syksy III",
    items: []
  },
  syksyIV: {
    orderNum: 4,
    name: "Syksy IV",
    items: []
  },
  kesäV: {
    orderNum: 5,
    name: "Kesä V",
    items: []
  }
  ,
  kevatI2: {
    orderNum: 6,
    name: "Kevät I / II",
    items: [],
    
  },
  kevatII2: {
    orderNum: 7,
    name: "Kevät II / II",
    items: []
  },
  syksyIII2: {
    orderNum: 8,
    name: "Syksy III / II",
    items: []
  },
  syksyIV2: {
    orderNum: 9,
    name: "Syksy IV / II",
    items: []
  },
  kesäV2: {
    orderNum: 10,
    name: "Kesä V / II",
    items: []
  }
  ,
  kevatI3: {
    orderNum: 11,
    name: "Kevät I / III",
    items: [],
    
  },
  kevatII3: {
    orderNum: 12,
    name: "Kevät II / III",
    items: []
  },
  syksyIII3: {
    orderNum: 13,
    name: "Syksy III / III",
    items: []
  },
  syksyIV3: {
    orderNum: 14,
    name: "Syksy IV / III",
    items: []
  },
  kesäV3: {
    orderNum: 15,
    name: "Kesä V / III",
    items: []
  }
})
}

export  {periodDataAutumn, periodDataSpring}