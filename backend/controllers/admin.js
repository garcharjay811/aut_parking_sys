const Sport = require("../models/sport");
const Institute = require("../models/institute");
const Participant = require("../models/participant");
const Referee = require("../models/referee");
const Venue = require("../models/venue");
const SportsOfficer = require("../models/sportsOfficer");
const Group = require("../models/group");
const TeamMatch = require("../models/teamMatch");
const populateGroup = require("../models/populateGroup");


exports.createSport = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    console.log(req.body);
    const sport = new Sport({
      sport_name: req.body.sport_name,
      sport_type: req.body.sport_type
    });
    sport.save().then(createdSport => {
        res.status(201).json({
          message: "Sport added successfully",
          Sport: createdSport
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Creating a Sport failed!"
        });
      });
  };
  
  exports.updateSport = (req, res, next) => {
    const sportData = {
      sport_name: req.body.sport_name,
      sport_type: req.body.sport_type
    };
    // ProjectRequest.updateOne({ _id: req.params.id, creator: req.userData.userId }, ProjectRequest)
    Sport.update( sportData, { where: { sport_name: req.params.sport_name } })
      .then(result => {
        console.log("result", result)
        if (result[0] > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate Sport!"
        });
      });
  };
  
  exports.getSports = (req, res, next) => {
    Sport.findAll()
    .then(requests => {
        res.status(200).json({
          message: "Sport fetched successfully!",
          Sports: requests,
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Sports failed!"
        });
      });
  };
  
  exports.getSportByName = (req, res, next) => {
    Sport.findOne({ where: { sport_name: req.params.sport_name} })
      .then(Sport => {
        if (Sport) {
          res.status(200).json(Sport);
        } else {
          res.status(404).json({ message: "Sport not found!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Sport failed!"
        });
      });
  };
  
//   exports.getProjectRequestByUserId = (req, res, next) => {
//     // console.log(req)
//     ProjectRequest.findAll({ where: {customer_id: req.userData.userId} })
//       .then(ProjectRequest => {
//         if (ProjectRequest) {
//           res.status(200).json(ProjectRequest);
//         } else {
//           res.status(404).json({ message: "ProjectRequest not found!" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({
//           message: "Fetching ProjectRequest failed!"
//         });
//       });
//   };
  
  // exports.deleteProjectRequest = (req, res, next) => {
  //   ProjectRequest.deleteOne({ id: req.params.id, customer_id: req.userData.customer_id })
  //     .then(result => {
  //       console.log(result);
  //       if (result.n > 0) {
  //         res.status(200).json({ message: "Deletion successful!" });
  //       } else {
  //         res.status(401).json({ message: "Not authorized!" });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({
  //         message: "Deleting ProjectRequests failed!"
  //       });
  //     });
  // };
  

// -----------------------------------------------------------------------------------------------------------------------
//  Institute
// -----------------------------------------------------------------------------------------------------------------------


exports.createInstituteAndSO = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    Institute.create({
      inst_name: req.body.inst_name,
      address: req.body.address
    }).then(
      SportsOfficer.create({
      so_id: req.body.so_id,
      so_name: req.body.so_name,
      inst_name : req.body.inst_name,
      phone: req.body.phone
    })).then(createdInstituteAndSO => {
        res.status(201).json({
          message: "Institute and Sports Officer added successfully",
          Institute: createdInstituteAndSO
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Creating a Institute and Sports Officer failed!"
        });
      });
  };
  
  exports.updateInstitute = (req, res, next) => {
    const instituteData = {
      inst_name: req.body.inst_name,
      address: req.body.address
    };
    // ProjectRequest.updateOne({ _id: req.params.id, creator: req.userData.userId }, ProjectRequest)
    Institute.update( instituteData, { where: { inst_name: req.params.inst_name } })
      .then(result => {
        console.log("result", result)
        if (result[0] > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate Institute!"
        });
      });
  };
  
  exports.getInstitutes = (req, res, next) => {
    Institute.findAll()
    .then(requests => {
        res.status(200).json({
          message: "Institute fetched successfully!",
          Institutes: requests,
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Institutes failed!"
        });
      });
  };
  
  exports.getInstituteByName = (req, res, next) => {
    Institute.findOne({ where: { inst_name: req.params.inst_name} })
      .then(Institute => {
        if (Institute) {
          res.status(200).json(Institute);
        } else {
          res.status(404).json({ message: "Institute not found!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Institute failed!"
        });
      });
  };

// -----------------------------------------------------------------------------------------------------------------------
// Participant
// -----------------------------------------------------------------------------------------------------------------------

exports.createParticipant = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    console.log(req.body);
    Participant.create({
      roll_id: req.body.roll_id,
      name : req.body.name,
      inst_name: req.body.inst_name,
      sport_name: req.body.sport_name,
      phone: req.body.phone
    }).then(createdParticipant => {
        res.status(201).json({
          message: "Participant added successfully",
          Participant: createdParticipant
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Creating a Participant failed!"
        });
      });
  };
  
  exports.updateParticipant = (req, res, next) => {
    const particpantData = {
        roll_id: req.body.roll_id,
        name : req.body.name,
        inst_name: req.body.inst_name,
        phone: req.body.phone,
        sport_name: req.body.sport_name
    };
    // ProjectRequest.updateOne({ _id: req.params.id, creator: req.userData.userId }, ProjectRequest)
    Participant.update( participantData, { where: { roll_id: req.params.roll_id } })
      .then(result => {
        console.log("result", result)
        if (result[0] > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate Participant Information!"
        });
      });
  };
  
  exports.getParticipants = (req, res, next) => {
    Participant.findAll()
    .then(requests => {
        res.status(200).json({
          message: "Participants fetched successfully!",
          Participants: requests,
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Participants failed!"
        });
      });
  };
  
  exports.getParticipantByRoll_ID = (req, res, next) => {
    Participant.findOne({ where: { roll_id: req.params.roll_id} })
      .then(Participant => {
        if (Participant) {
          res.status(200).json(Participant);
        } else {
          res.status(404).json({ message: "Participant not found!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Participant failed!"
        });
      });
  };

// -----------------------------------------------------------------------------------------------------------------------
// Referee
// -----------------------------------------------------------------------------------------------------------------------

exports.createReferee = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    console.log([req.body.referee_name, req.body.sport_name, req.body.phone])
    Referee.create({
      referee_name: req.body.referee_name,
      sport_name : req.body.sport_name,
      phone: req.body.phone
    }).then(createdReferee => {
        res.status(201).json({
          message: "Referee added successfully",
          Referee: createdReferee
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Creating a Referee failed!"
        });
      });
  };
  
  exports.updateReferee = (req, res, next) => {
    const refereeData = {
        referee_name: req.body.referee_name,
        sport_name : req.body.sport_name,
        phone: req.body.phone
    };
    // ProjectRequest.updateOne({ _id: req.params.id, creator: req.userData.userId }, ProjectRequest)
    Referee.update( refereeData, { where: { referee_name: req.params.referee_name } })
      .then(result => {
        console.log("result", result)
        if (result[0] > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate Referee Information!"
        });
      });
  };
  
  exports.getReferees = (req, res, next) => {
    Referee.findAll()
    .then(requests => {
        res.status(200).json({
          message: "Referees fetched successfully!",
          Referees: requests,
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Referees failed!"
        });
      });
  };
  
  exports.getRefereeByName = (req, res, next) => {
    Referee.findOne({ where: { referee_name: req.params.referee_name} })
      .then(Referee => {
        if (Referee) {
          res.status(200).json(Referee);
        } else {
          res.status(404).json({ message: "Referee not found!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Referee failed!"
        });
      });
  };

// -----------------------------------------------------------------------------------------------------------------------
// Venue
// -----------------------------------------------------------------------------------------------------------------------

exports.createVenue = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    Venue.create({
      venue_name: req.body.venue_name,
      address : req.body.address
    }).then(createdVenue => {
        res.status(201).json({
          message: "Venue added successfully",
          Venue: createdVenue
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Creating a Venue failed!"
        });
      });
  };
  
  exports.updateVenue = (req, res, next) => {
    const venueData = {
        venue_name: req.body.venue_name,
        address : req.body.address
    };
    // ProjectRequest.updateOne({ _id: req.params.id, creator: req.userData.userId }, ProjectRequest)
    Venue.update( venueData, { where: { venue_name: req.params.venue_name } })
      .then(result => {
        console.log("result", result)
        if (result[0] > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate Venue Information!"
        });
      });
  };
  
  exports.getVenues = (req, res, next) => {
    Venue.findAll()
    .then(requests => {
        res.status(200).json({
          message: "Venues fetched successfully!",
          Venues: requests,
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Venues failed!"
        });
      });
  };
  
  exports.getVenueByName = (req, res, next) => {
    Venue.findOne({ where: { venue_name: req.params.venue_name } })
      .then(Venue => {
        if (Venue) {
          res.status(200).json(Venue);
        } else {
          res.status(404).json({ message: "Venue not found!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Venue failed!"
        });
      });
  };

// -----------------------------------------------------------------------------------------------------------------------
// Sports Officer
// -----------------------------------------------------------------------------------------------------------------------
  
  exports.updateSportsOfficer = (req, res, next) => {
    const sportsOfficerData = {
        so_id: req.body.so_id,
        so_name: req.body.so_name,
        inst_name : req.body.inst_name,
        phone: req.body.phone
    };
    // ProjectRequest.updateOne({ _id: req.params.id, creator: req.userData.userId }, ProjectRequest)
    SportsOfficer.update( sportsOfficerData, { where: { so_id: req.params.so_id } })
      .then(result => {
        console.log("result", result)
        if (result[0] > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate SportsOfficer Information!"
        });
      });
  };
  
  exports.getSportsOfficers = (req, res, next) => {
    SportsOfficer.findAll()
    .then(requests => {
        res.status(200).json({
          message: "SportsOfficers fetched successfully!",
          SportsOfficers: requests,
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching SportsOfficers failed!"
        });
      });
  };
  
  exports.getSportsOfficerByID = (req, res, next) => {
    SportsOfficer.findOne({ where: { so_id: req.params.so_id } })
      .then(SportsOfficer => {
        if (SportsOfficer) {
          res.status(200).json(SportsOfficer);
        } else {
          res.status(404).json({ message: "SportsOfficer not found!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching SportsOfficer failed!"
        });
      });
  };

// -----------------------------------------------------------------------------------------------------------------------
// Group
// -----------------------------------------------------------------------------------------------------------------------

exports.createGroup = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    Group.create({
      group_name: req.body.group_name,
      sport_name: req.body.sport_name,
      group_winner: null
    }).then(createdGroup => {
        res.status(201).json({
          message: "Group added successfully",
          Group: createdGroup
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Creating a Group failed!"
        });
      });
  };

  exports.PopulateGroup = (req, res, next) => {
    populateGroup.create({
      group_name: req.body.group_name,
      sport_name: req.body.sport_name,
      inst_name: req.body.inst_name
    }).then(populatedGroup => {
        res.status(201).json({
          message: "Group populated successfully",
          populateGroup: populatedGroup
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Populating a Group failed!"
        });
      });
  };

  exports.getPopulatedGroups = (req, res, next) => {
    populateGroup.findAll()
    .then(requests => {
        res.status(200).json({
          message: "Populated Groups fetched successfully!",
          populatedGroups: requests,
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Populated Groups failed!"
        });
      });
  };
  
  exports.updateGroup = (req, res, next) => {
    const groupData = {
        group_name: req.body.group_name,
        sport_name: req.body.sport_name,
        group_winner : req.body.group_winner
    };
    // ProjectRequest.updateOne({ _id: req.params.id, creator: req.userData.userId }, ProjectRequest)
    Group.update( groupData, { where: { group_name: req.params.group_name, sport_name: req.params.sport_name } })
      .then(result => {
        console.log("result", result)
        if (result[0] > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate SportsOfficer Information!"
        });
      });
  };
  
  exports.getGroups = (req, res, next) => {
    Group.findAll()
    .then(requests => {
        res.status(200).json({
          message: "Groups fetched successfully!",
          Groups: requests,
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Groups failed!"
        });
      });
  };
  
  exports.getGroupByName = (req, res, next) => {
    Group.findOne({ where: { group_name: req.params.group_name, sport_name: req.params.sport_name } })
      .then(Group => {
        if (Group) {
          res.status(200).json(Group);
        } else {
          res.status(404).json({ message: "Group not found!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Group failed!"
        });
      });
  };

  exports.addGroupAndPopulate = (req, res, next) => {
    const institutes = req.body.inst_name
    const groupInst = {
      group_name: req.body.group_name,
      sport_name: req.body.sport_name,
      group_winner: null
    }
    Group.create(groupInst).then(res => {
      institutes.map(institute => {
        populateGroup.create({
          group_name: req.body.group_name,
          sport_name: req.body.sport_name,
          inst_name: institute.institute
        })
      })
    }).then(addMatches => {
      for (i = 0; i < institutes.length; i++) {
        for (j = i+1; j < institutes.length; j++) {
          console.log(institutes[i])
          console.log(institutes[j])
          TeamMatch.create({
            institute1: institutes[i].institute,
            institute2: institutes[j].institute,
            sport_name: req.body.sport_name,
            group_name: req.body.group_name,
          })
        }
      } 
    }).then(createGroup => {
      res.status(201).json({
        message: "Created Group and Added Matches",
      });
    }).catch(error => {
      res.status(500).json({
        message: "Creating Group and Matches failed!"});
    });
  };

  exports.updateTeamMatch = (req, res, next) => {
    const teamMatchData = {
        venue_name : req.body.venue_name,
        date : new Date(req.body.date),
        referee_id : req.body.referee_id,
        winner: req.body.winner
    };
    console.log(teamMatchData);
    console.log("req.params.match_id", req.params.match_id)
    TeamMatch.update( teamMatchData, { where: { match_id: parseInt(req.params.match_id) } })
      .then(result => {
        console.log("result", result)
        if (result[0] > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        console.log(error);
        console.log(teamMatchData.match_id);
        res.status(500).json({
          message: "Couldn't update TeamMatch Information!"
        });
      });
  };

  exports.getTeamMatches = (req, res, next) => {
    TeamMatch.findAll()
    .then(requests => {
        res.status(200).json({
          message: "Team Matches fetched successfully!",
          TeamMatches: requests,
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching Team Matches failed!"
        });
      });
  };
