<html>
    <head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
    <script src="./jquery.litedialog.js"></script>
    <script>

    $(document).ready(function() {
        $('#one').click(function() {
            $.liteDialog({ html: 'modal', modal:true});
        });

        $('#two').click(function() {
            $.liteDialog({ html: 'normal'});
        });
        
        $('#funky').click(function() {
            $.liteDialog({
                html: "Your <b>HTML</b> here",
                shadow: 'red',
                width: '200px',
                borderRadius: '20px',
                background: '#00FFCC',
                color: 'blue',
                padding: 0
            });
        });    
    });
    </script>
    </head>
    <body>
        <div id='one'>modal</div><br />
        <div id='two'>normal</div><br />
        <div id='funky'>funky</div>
    </body>
</html>