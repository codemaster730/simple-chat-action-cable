App.chat =
  App.cable.subscriptions.create('ChatChannel', {
    received: prepend_msg
  })

addEventListener('turbolinks:load', function () {
  join_chat_form.addEventListener('submit', join_chat)
  message_form.addEventListener('submit', send_msg)
})

function join_chat(event) {
  event.preventDefault()

  if (!username.value)
    return

  enter_name_container.style.display = 'none'
  messages_container.style.display   = 'block'

  const msg = `${username.value} joined the chat`
  App.chat.send({ msg })

  message.focus()
}

function send_msg(event) {
  event.preventDefault()

  const msg = `${username.value}: ${message.value}`
  App.chat.send({ msg })

  message.value = ''
}

function prepend_msg(data) {
  const p = document.createElement('p')
  add_time_stamp(p)
  p.append(data.msg)
  messages.prepend(p)
}

function add_time_stamp(p) {
  const
    time = new Date().toLocaleTimeString(),
    pre  = document.createElement('pre')

  pre.append(time)
  p.append(pre)
}
