  const { events, Job, Group } = require("brigadier")
  // const request = require('request');

  var image_name = "redis-service"
  var docker_registry ="135719648897.dkr.ecr.us-east-1.amazonaws.com"
  var full_image_name = docker_registry + "/" + image_name

  events.on("push", (e, p) => {
    // extract parameters
    var payload = JSON.parse(e.payload)
    // var user = payload.actor.display_name
    // var branch = payload.push.changes[0].new.name
    // var commit_message = payload.push.changes[0].new.target.message
    var tag = payload.push.changes[0].new.target.hash.substring(0, 7);
    commit_link = payload.push.changes[0].new.target.links.html.href
    var full_image_name_with_tag= full_image_name + ":" + tag
    console.log(full_image_name_with_tag)

    // build docker images
    var one = new Job("kaniko"+"-"+image_name, "135719648897.dkr.ecr.us-east-1.amazonaws.com/mykaniko:v0.1")

    one.mountPath="/kaniko/buildcontext"
    one.args=[
      "--dockerfile=/kaniko/buildcontext/Dockerfile",
      "--context=/kaniko/buildcontext",
      `--destination=${full_image_name_with_tag}`
    ]
    Group.runEach([one])
  })
  

