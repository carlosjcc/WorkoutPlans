Meteor.methods({
  addResolution(resolution) {
    check(resolution, String);
    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.insert({
      text: resolution,
      complete: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },
  addBlankPlan() {
    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    let id =  Resolutions.insert({
      name: "New Plan",
      workOuts: [],
      createdAt: new Date(),
      user: Meteor.userId()
    });

    return id;
  },

  changeName(id, name) {
    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.update(
      {_id: id},
      { $set:
        {
          name: name
        }

      });
  },

  addExercise(id, text) {

    Resolutions.update(
      {_id: id},
      { $push:
        {
          workOuts: text
        }
      });
  },

  toggleResolution(resolution) {
    check(resolution, Object);
    if(Meteor.userId() !== resolution.user) {
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.update(resolution._id, {
      $set: {complete: !resolution.complete}
    });
  },
  deleteResolution(resolution) {
    check(resolution, Object);
    if(Meteor.userId() !== resolution.user) {
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.remove(resolution._id);
  },
  updateResolution(resolution) {
    check(resolution, Object);
    if(Meteor.userId() !== resolution.user) {
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.update(resolution._id,{
      $set: {text: resolution.text}
    });
  }
});