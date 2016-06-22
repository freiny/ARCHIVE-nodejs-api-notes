package challenge

import (
	"bytes"
	"testing"

	"github.com/freiny/go-util/ftest"
)

func ReverseString(s string) string {
	var ret bytes.Buffer
	for i := len(s) - 1; i > -1; i-- {
		ret.WriteString(string(s[i]))
	}
	return ret.String()
}

func TestReverseString(t *testing.T) {
	tests := []ftest.Test{
		{1, ReverseString(""), ""},
		{2, ReverseString("abc"), "cba"},
		{3, ReverseString(" ab c."), ".c ba "},
	}
	ftest.Assert(t, tests, func(s string) { t.Errorf(s) })
}
