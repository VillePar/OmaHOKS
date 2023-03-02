const periodDataFall = (aot, yot) => {
    return ( {
    opinnot: {
        id: 0,
        name: "Tutkinnon osat",
        items: aot
    },
    syksyI: {
        id: 1,
      name: "Syksy I",
      items: [],
      
    },
    syksyII: {
        id: 2,
      name: "Syksy II",
      items: []
    },
    kevätIII: {
        id: 3,
      name: "Kevät III",
      items: []
    },
    kevätIV: {
        id: 4,
      name: "Kevät IV",
      items: []
    },
    kesäV: {
        id: 5,
      name: "Kesä V",
      items: []
    }
    ,
    syksyI2: {
        id: 6,
      name: "Syksy I/II",
      items: [],
      
    },
    syksyII2: {
        id: 7,
      name: "Syksy II/II",
      items: []
    },
    kevätIII2: {
        id: 8,
      name: "Kevät III/II",
      items: []
    },
    kevätIV2: {
        id: 9,
      name: "Kevät IV/II",
      items: []
    },
    kesäV2: {
        id: 10,
      name: "Kesä V/II",
      items: []
    }
    ,
    syksyI3: {
        id: 11,
      name: "Syksy I/III",
      items: [],
      
    },
    syksyII3: {
        id: 12,
      name: "Syksy II/III",
      items: []
    },
    kevätIII3: {
        id: 13,
      name: "Kevät III/III",
      items: []
    },
    kevätIV3: {
        id: 14,
      name: "Kevät IV/III",
      items: []
    },
    kesäV3: {
        id: 15,
      name: "Kesä V/III",
      items: []
    }
})
}

const periodDataSpring = (props) => {
  return ( {
  opinnot: {
      id: 0,
      name: "Tutkinnon osat",
      items: props
  },
  kevatI: {
      id: 1,
    name: "Kevät I",
    items: [],
    
  },
  kevatII: {
      id: 2,
    name: "Kevät II",
    items: []
  },
  syksyIII: {
      id: 3,
    name: "Syksy III",
    items: []
  },
  syksyIV: {
      id: 4,
    name: "Syksy IV",
    items: []
  },
  kesäV: {
      id: 5,
    name: "Kesä V",
    items: []
  }
  ,
  kevatI2: {
      id: 6,
    name: "Kevät I/II",
    items: [],
    
  },
  kevatII2: {
      id: 7,
    name: "Kevät II/II",
    items: []
  },
  syksyIII2: {
      id: 8,
    name: "Syksy III/II",
    items: []
  },
  syksyIV2: {
      id: 9,
    name: "Syksy IV/II",
    items: []
  },
  kesäV2: {
      id: 10,
    name: "Kesä V/II",
    items: []
  }
  ,
  kevatI3: {
      id: 11,
    name: "Kevät I/III",
    items: [],
    
  },
  kevatII3: {
      id: 12,
    name: "Kevät II/III",
    items: []
  },
  syksyIII3: {
      id: 13,
    name: "Syksy III/III",
    items: []
  },
  syksyIV3: {
      id: 14,
    name: "syksy IV/III",
    items: []
  },
  kesäV3: {
      id: 15,
    name: "Kesä V/III",
    items: []
  }
})
}

export  {periodDataFall, periodDataSpring}